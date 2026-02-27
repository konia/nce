'use client';

import { PauseIcon, PlayIcon, RefreshCwIcon, RepeatIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import BackButton from '@/components/layout/back-button';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Lesson } from '@/constants';
import { cn, formatTime } from '@/lib/utils';

export default function LessonContent({
  bookId,
  lessonId,
  lessonData
}: {
  bookId: string;
  lessonId: string;
  lessonData: Lesson;
}) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const lessonSlug = decodeURIComponent(lessonId);

  const [lyrics, setLyrics] = useState(lessonData.data);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [playMode, setPlayMode] = useState('sequence'); // 'sequence' (连续) | 'loop' (单句)

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  // 同步音频总时长到歌词数据的最后一行
  const syncDuration = () => {
    const audio = audioRef.current;
    // 确保音频对象存在，且 duration 是有效数字
    if (audio && audio.duration && !isNaN(audio.duration) && audio.duration !== Infinity) {
      setDuration(audio.duration);

      setLyrics((prevLyrics) => {
        // 深拷贝，避免直接修改 state 引用
        const newLyrics = [...prevLyrics];
        if (newLyrics.length > 0) {
          // 只有当时间确实需要更新时才更新（避免死循环）
          if (newLyrics[newLyrics.length - 1].endTime !== audio.duration) {
            newLyrics[newLyrics.length - 1].endTime = audio.duration - 2;
            console.log('手动同步时长成功:', audio.duration);
            return newLyrics;
          }
        }
        return prevLyrics;
      });
    }
  };
  // 监听器绑定给 Audio 元素
  const handleLoadedMetadata = () => syncDuration();

  // 核心：时间更新与循环控制
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const currentTime = audio.currentTime;
    setCurrentTime(currentTime); // 更新进度条位置

    if (playMode === 'loop' && activeIndex !== -1) {
      const currentLine = lyrics[activeIndex];
      // 如果当前时间超过了该句结束时间 (预留 0.2s 缓冲防止听感突兀)
      if (currentLine && currentTime >= currentLine.endTime) {
        audio.currentTime = currentLine.startTime; // 重置回开始
        audio.play(); // 确保继续播放
        return; // 阻止后续更新 activeIndex，锁定在当前句
      }
    }

    // 正常的进度更新查找
    // 逻辑：找到满足 startTime <= currentTime < endTime 的那一行
    const index = lyrics.findIndex((line) => {
      return currentTime >= line.startTime && currentTime < line.endTime;
    });

    // 只有当索引变化时才更新状态
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index);
      scrollToActiveLine(index);
    }
  };

  // 单句循环播放时，滚动到当前高亮行
  const scrollToActiveLine = (index: number) => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.children[index];
      console.log('🚀 ~ scrollToActiveLine ~ activeElement:', activeElement);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  };

  // 点击字幕跳转
  const handleLineClick = (index: number) => {
    const line = lyrics[index];
    if (audioRef.current) {
      audioRef.current.currentTime = line.startTime;
      audioRef.current.play();
      setActiveIndex(index); // 立即高亮，提升响应速度
      setIsPlaying(true);
    }
  };

  // 切换播放/暂停
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 拖动进度条
  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentTime(value); // 立即更新 UI，避免拖动卡顿
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // --- 新增：倍速切换逻辑 ---
  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate); // 更新 UI 状态高亮
    if (audioRef.current) {
      audioRef.current.playbackRate = rate; // 实际改变音频的播放速度
    }
  };

  // 组件挂载后，主动检查一下音频状态
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.readyState >= 1) {
        console.log('发现缓存，主动同步时长');
        syncDuration();
      }
    }
    toast.dismiss('welcome-toast');
    setTimeout(() => {
      localStorage.setItem('PlaybackHistory', JSON.stringify({ bookId, lessonId }));
    }, 100);
  }, [bookId, lessonId]);

  return (
    <section className="relative mt-[10vh] flex h-[70vh] overflow-hidden rounded-2xl bg-white">
      <section className="absolute top-5 left-5 z-1">
        <BackButton url={`/${bookId}/`} />
      </section>
      <section className="relative flex w-150 flex-col items-center justify-center overflow-hidden rounded-sm p-4">
        <Image
          src="/images/read.jpg"
          width={320}
          height={320}
          className="w-80 rounded-full"
          alt={lessonData.title}
          loading="eager"
        />

        <h3 className="my-6 flex items-center gap-x-2 text-xl font-semibold text-gray-700">{lessonData.title}</h3>
        {audioRef && (
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
          >
            <source src={`/audio/${bookId}/${lessonSlug}.mp3`} type="audio/mpeg" />
            <track
              kind="captions"
              srcLang="en"
              label="English captions"
              src={`/audio/${bookId}/${lessonSlug}.vtt`}
              default
            />
          </audio>
        )}

        <section className="flex w-75 flex-col items-center justify-between">
          <Slider
            defaultValue={[0]}
            max={duration}
            step={1}
            value={[currentTime]}
            className="mx-auto w-full"
            onValueChange={(value) => handleSeek((value as number[])[0])}
            orientation="horizontal"
          />
          <div className="mt-2 flex w-75 items-center justify-between text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </section>

        <section className="flex w-75 items-center justify-between">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className={`text-gray-400 ${playMode === 'sequence' ? 'text-accent-foreground' : ''}`}
                  onClick={() => setPlayMode('sequence')}
                >
                  <RepeatIcon />
                </Button>
              }
            />
            <TooltipContent side="bottom">Sequence</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className={`text-gray-400 ${playMode === 'loop' ? 'text-accent-foreground' : ''} `}
                  onClick={() => setPlayMode('loop')}
                >
                  <RefreshCwIcon />
                </Button>
              }
            />
            <TooltipContent side="bottom">Loop</TooltipContent>
          </Tooltip>

          <section className="flex items-center gap-x-2">
            <Button
              size="icon-sm"
              variant="outline"
              disabled={lessonData.pre === null}
              onClick={() => router.push(`/${bookId}/${lessonData.pre}`)}
            >
              <SkipBackIcon />
            </Button>

            <Button size="icon-lg" onClick={togglePlay} className="relative size-14 overflow-hidden rounded-full">
              <span
                className={cn(
                  'translate-x-0 opacity-100 transition-all duration-300 ease-in-out',
                  isPlaying ? '-translate-x-6 opacity-0' : ''
                )}
              >
                <PlayIcon className="size-5" />
              </span>
              <span
                className={cn(
                  'absolute translate-x-6 opacity-0 transition-all duration-300 ease-in-out',
                  isPlaying ? 'translate-x-0 opacity-100' : ''
                )}
              >
                <PauseIcon className="size-5" />
              </span>
            </Button>
            <Button
              size="icon-sm"
              variant="outline"
              disabled={lessonData.next === null}
              onClick={() => router.push(`/${bookId}/${lessonData.next}`)}
            >
              <SkipForwardIcon />
            </Button>
          </section>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className={`text-gray-400 ${playbackRate === 1 ? 'text-accent-foreground' : ''} `}
                  onClick={() => handleSpeedChange(1)}
                >
                  1x
                </Button>
              }
            />
            <TooltipContent side="bottom">1x speed</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className={`text-gray-400 ${playbackRate === 2 ? 'text-accent-foreground' : ''} `}
                  onClick={() => handleSpeedChange(2)}
                >
                  2x
                </Button>
              }
            />
            <TooltipContent side="bottom">2x speed</TooltipContent>
          </Tooltip>
        </section>
      </section>
      <section className="flex-1 bg-amber-100 py-10">
        <ScrollArea className="h-full px-10">
          <section ref={scrollContainerRef} className="scroll-smooth">
            {lyrics &&
              lyrics.map((line, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-4 transition-all duration-300 ease-in-out hover:opacity-80 ${
                    index === activeIndex
                      ? 'text-gray-900 opacity-100 hover:opacity-100' // 高亮样式
                      : 'text-gray-600 opacity-40' // 普通样式
                  } `}
                  onClick={() => handleLineClick(index)}
                >
                  <div className="text-lg">{line.en}</div>
                  <div className="mt-1 text-sm text-gray-500"> {line.cn}</div>
                </div>
              ))}
          </section>
        </ScrollArea>
      </section>
    </section>
  );
}
