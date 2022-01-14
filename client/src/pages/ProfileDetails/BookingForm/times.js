export const times = [...Array(24).keys()].map((number) => {
  if (number === 0) {
    return {
      time: '12:00 AM',
      value: number,
    };
  } else if (number < 12) {
    return {
      time: number.toString() + ':00 AM',
      value: number,
    };
  } else if (number === 12) {
    return {
      time: number.toString() + ':00 PM',
      value: number,
    };
  } else {
    return {
      time: (number - 12).toString() + ':00 PM',
      value: number,
    };
  }
});
