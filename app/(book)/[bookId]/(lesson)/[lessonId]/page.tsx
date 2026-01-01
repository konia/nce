'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';

import BackButton from '@/components/layout/back-button';
import { LessonApiParams } from '@/constants';
import { fetchApi } from '@/lib/api';

export default function LessonPage() {
  // const { bookId, lessonId } = use(params);
  const { bookId, lessonId } = useParams<LessonApiParams>();
  const [lrcData, setLrcData] = useState<string>('');
  const audio = useRef<HTMLAudioElement>(null);
  console.log('🚀 ~ LessonPage ~ bookId:', bookId);

  // if (typeof bookId !== 'string' || typeof lessonId !== 'string') {
  //   return null; // Or a loading/error component
  // }

  const BookNumber = Number(bookId.slice(-1));
  const lessonSlug = decodeURIComponent(lessonId);

  const LINE_RE = /\[(\d+:\d+\.\d+)\](.*)/;
  const TIME_RE = /\[(\d+):(\d+(?:\.\d+)?)\]/;
  const INFO_RE = {
    album: /\[al:(.*)\]/,
    artist: /\[ar:(.*)\]/,
    title: /\[ti:(.*)\]/
  };

  const state = {
    data: [], // [{en, cn, start, end}]
    album: '',
    artist: '',
    title: '',
    segmentEnd: 0,
    activeIdx: -1,
    playbackMode: 'single-play', // 'single-play', 'single-loop', 'continuous', 'ab-loop'
    dictation: false,
    abLoop: { a: null, b: null },
    hasTranslation: false
  };

  useEffect(() => {
    const fetchLrcData = async () => {
      const decodedText: string = await fetchApi(`api/book/${bookId}/${lessonId}`);
      console.log('🚀 ~ fetchLrcData ~ data:', decodedText);

      const lines = decodedText.split(/\r?\n/).filter(Boolean);
      console.log('🚀 ~ fetchLrcData ~ lines:', lines);

      lines.forEach((raw, i) => {
        const line = raw.trim();
        const match = line.match(LINE_RE);
        console.log('🚀 ~ fetchLrcData ~ match:', match);

        if (!match) {
          // parseInfo(line);
          return;
        }

        // const start = parseTime(`[${match[1]}]`);
        const contentAfterTimestamp = match[2] || '';
        const [enRaw, cnRaw = ''] = contentAfterTimestamp.split('|');
        const en = (enRaw || '').trim();
        const cn = (cnRaw || '').trim();

        // Skip empty lines (lines with only timestamp but no text, or only whitespace)
        if (!en && !cn) {
          return;
        }

        if (cn) {
          state.hasTranslation = true;
        }

        // const end = 0;
        for (let j = i + 1; j < lines.length; j++) {
          const nxt = lines[j].match(LINE_RE);
          if (nxt) {
            // end = parseTime(`[${nxt[1]}]`);
            break;
          }
        }
        // state.data.push({ en, cn, start, end });
        console.log('🚀 ~ fetchLrcData ~ state:', state);
      });
    };
    fetchLrcData();
  }, []);

  // function parseInfo(line) {
  //   for (const key in INFO_RE) {
  //     const m = line.match(INFO_RE[key]);
  //     if (m) state[key] = m[1];
  //   }
  // }

  // /** -------------------------------------------------
  //  *  时间解析
  //  * ------------------------------------------------- */
  // function parseTime(tag) {
  //   const m = TIME_RE.exec(tag);
  //   return m ? parseInt(m[1], 10) * 60 + parseFloat(m[2]) - 0.5 : 0;
  // }

  return (
    <main className="container mx-auto">
      <section className="mt-[8vh] mb-3 text-right">
        <BackButton />
      </section>
      <section className="mb-[10vh] flex h-[70vh] rounded-2xl bg-white">
        <section
          className="relative aspect-square w-full max-w-150 overflow-hidden rounded-sm"
          // style={{ backgroundColor: cover.color }}
        >
          {lrcData}
          {/* <Image
            src={cover.background}
            width={1280}
            height={1280}
            className="opacity-10 mix-blend-multiply"
            alt={cover.background}
          /> */}
        </section>
        <section className="flex-1">
          {audio && (
            <audio
              ref={audio}
              controls
              onLoad={() => console.log('[AUDIO] loadstart - readyState:', audio.current?.readyState)}
              onLoadStart={() => console.log('[AUDIO] loadstart - readyState:', audio.current?.readyState)}
              onLoadedData={() =>
                console.log(
                  '[AUDIO] loadedmetadata - readyState:',
                  audio.current?.readyState,
                  'duration:',
                  audio.current?.duration
                )
              }
              onLoadedMetadata={() => console.log('[AUDIO] loadeddata - readyState:', audio.current?.readyState)}
              onCanPlay={() => {
                console.log('[AUDIO] canplay - readyState:', audio.current?.readyState);
                // stalledCount = 0; // Reset stalled counter on successful load
                // if (audio.current?.readyState >= 3) {
                // HAVE_FUTURE_DATA or better
                // audioReady = true;
                // // Enable UI
                // content.style.pointerEvents = '';
                // content.style.opacity = '';
                // }
              }}
              onStalled={() => {}}
            >
              <source src={`/audio/${bookId}/${lessonSlug}.mp3`} type="audio/mpeg" />
            </audio>
          )}

          <div className="player-container">
            <div className="custom-player-wrapper">
              {/* <div className="custom-player">
                <Button id="play-pause-btn" className="player-btn play"></Button>
                <div className="progress-container">
                  <div id="progress-bar">
                    <div id="progress"></div>
                  </div>
                  <div id="time-display">0:00 / 0:00</div>
                </div>
                <div className="volume-container">
                  <Button id="volume-btn" className="player-btn volume-high"></Button>
                  <input type="range" id="volume-slider" min="0" max="1" step="0.01" value="1" />
                </div>
              </div>
              <div id="playback-modes">
                <Button id="mode-ab-loop">A-B循环</Button>
                <Button id="set-a">设置A点</Button>
                <Button id="set-b">设置B点</Button>
                <Button id="mode-continuous">连续播放</Button>
                <Button id="mode-single-loop">单句循环</Button>
                <Button id="mode-single-play">单次播放</Button>
                <div id="dictation-container" className="dictation-container">
                  <input type="checkbox" id="dictation-mode" />
                  <label htmlFor="dictation-mode"></label>
                  <span>听写模式</span>
                </div>
              </div>
              <div id="playback-speed">
                <Button id="speed-0.5x">0.5x</Button>
                <Button id="speed-1x">1x</Button>
                <Button id="speed-1.2x">1.2x</Button>
                <Button id="speed-1.5x">1.5x</Button>
                <Button id="speed-2x">2x</Button>
                <Button id="speed-3x">3x</Button>
              </div>
              <div id="display-modes">
                <Button id="mode-bilingual">中英</Button>
                <Button id="mode-en">英文</Button>
                <Button id="mode-cn">中文</Button>
              </div> */}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
