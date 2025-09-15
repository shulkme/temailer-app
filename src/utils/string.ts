/**
 * 获取字符串首字符，用于头像缺省文本
 * @param str
 */
export function getInitials(str: string) {
  // 判断是否为中文字符
  const isChinese = (char: string) => /[\u4e00-\u9fa5]/.test(char);

  // 判断是否为全角字符（包括全角英文字母和全角数字）
  const isFullWidth = (char: string) => /[\uff00-\uffef]/.test(char);

  // 判断是否为英文字母（大小写都支持）
  const isAlphabet = (char: string) => /[A-Za-z]/.test(char);

  // 判断字符类型：是否为中文、全角、字母等
  const getCharType = (char: string) => {
    if (isChinese(char)) return 'chinese';
    if (isFullWidth(char)) return 'fullwidth';
    if (isAlphabet(char)) return 'alphabet';
    return 'other';
  };

  // 如果字符串为空，返回空字符串
  if (!str) return '';

  // 获取前两个字符
  const firstChar = str[0];
  const secondChar = str[1];

  // 获取字符类型
  const firstCharType = getCharType(firstChar);
  const secondCharType = getCharType(secondChar);

  // 判断如何取字符：如果前两个字符都是中文，取一个中文字符；如果前两个是全角字符，取一个
  if (firstCharType === 'chinese' && secondCharType === 'chinese') {
    return firstChar; // 只取第一个中文字符
  }

  if (firstCharType === 'fullwidth' && secondCharType === 'fullwidth') {
    return firstChar; // 只取第一个全角字符
  }

  // 其他情况下，取前两个字符
  return firstChar + secondChar;
}
