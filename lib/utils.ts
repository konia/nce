import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
