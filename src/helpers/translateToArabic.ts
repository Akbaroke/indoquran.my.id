export const translateToArabic = (latinNumber: number | string): string => {
  const arabicNumbers: { [key: string]: string } = {
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    '0': '٠',
  };

  let arabicNumber = '';
  const latinDigits: string[] = latinNumber.toString().split('');

  latinDigits.forEach((digit) => {
    arabicNumber += arabicNumbers[digit] || digit;
  });

  return arabicNumber;
};
