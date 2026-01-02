import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { INFO_REG, TIME_REG } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 阿拉伯数字转罗马数字（基础映射法，适用于1-10）
 * @param {number} num - 待转换的阿拉伯数字（1-10）
 * @returns {string} 对应的罗马数字
 */
export function convertToRomanBasic(num: number) {
  // 建立阿拉伯数字与罗马数字的映射关系
  const romanMap: Record<number, string> = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X'
  };

  // 校验输入有效性
  if (typeof num !== 'number' || !romanMap[num]) {
    return '无效输入，请输入1-10之间的整数';
  }

  return romanMap[num];
}

export const formatTime = (time: number) => {
  if (!time || isNaN(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const parseTime = (tag: string[]) => {
  // 计算秒数: 分 * 60 + 秒 + 毫秒
  const [, minutes, seconds, milliseconds] = tag;
  // 这里的毫秒通常是两位数（10ms单位）或三位数
  // 如果是两位数 (e.g. .61) 代表 610ms => 0.61s
  return Number(minutes) * 60 + Number(seconds) + Number(milliseconds) / (milliseconds.length === 2 ? 100 : 1000);
};

export function parseLrc(lrcString: string) {
  let endTime = 0;
  let startTime = 0;
  const lines = lrcString.split(/\r?\n/).filter(Boolean);
  const result: { startTime: number; endTime: number; en: string; cn: string }[] = [];
  const info = {
    album: '',
    artist: '',
    title: ''
  };

  lines.forEach((line, i) => {
    const match = TIME_REG.exec(line);

    if (!match) {
      for (const key in INFO_REG) {
        const m = line.match(INFO_REG[key as keyof typeof INFO_REG]);
        if (m) info[key as keyof typeof INFO_REG] = m[1];
      }
      return;
    } else {
      startTime = parseTime(match);
      const [en, cn] = line.replace(TIME_REG, '').trim().split('|');
      console.log('🚀 ~ parseLrc ~ lines.length:', lines.length);

      for (let j = i + 1; j < lines.length; j++) {
        const nextMatch = TIME_REG.exec(lines[j]);
        console.log('🚀 ~ parseLrc ~ nextMatch:', j);
        if (nextMatch) {
          endTime = Number((parseTime(nextMatch) - 0.5).toFixed(2));
          break;
        }
      }

      if (en || cn) result.push({ startTime, endTime, en: en || '', cn: cn || '' });
    }
  });

  return { ...info, data: result };
}
