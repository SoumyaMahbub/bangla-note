const englishToBanglaNumber = (number) => { 
    const numbers = {
        '0': '০',
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯',
        '০': '০',
        '১': '১',
        '২': '২',
        '৩': '৩',
        '৪': '৪',
        '৫': '৫',
        '৬': '৬',
        '৭': '৭',
        '৮': '৮',
        '৯': '৯',
    };
    const output = []
    for (var i = 0; i < number.length; i++) {
        if (numbers.hasOwnProperty(number[i])) {
          output.push(numbers[number[i]]);
          console.log(numbers[number[i]]);
        }
    } 
    return output.join('');
}
export default englishToBanglaNumber;