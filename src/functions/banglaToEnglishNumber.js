const banglaToEnglishNumber = (number) => {
    const numbers = {
        '০': 0,
        '১': 1,
        '২': 2,
        '৩': 3,
        '৪': 4,
        '৫': 5,
        '৬': 6,
        '৭': 7,
        '৮': 8,
        '৯': 9
    };
    const output = []
    console.log(number);
    for (var i = 0; i < number.length; i++) {
        if (numbers.hasOwnProperty(number[i])) {
        output.push(numbers[number[i]]);
        } else {
            return undefined;
        }
    } 
    return output.join('');
}
export default banglaToEnglishNumber;