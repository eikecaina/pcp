export function isWorkDay(
  dates: (Date | string)[]
): { date: Date; isWeekend: boolean }[] {
  return dates.map((date) => {
    const validDate = typeof date === "string" ? new Date(date) : date;

    if (isNaN(validDate.getTime())) {
      throw new Error(`Data inválida: ${date}`);
    }

    const isWeekend = validDate.getDay() === 0 || validDate.getDay() === 6;

    return { date: validDate, isWeekend };
  });
}

export function checkDatesRange(
  startDate: string,
  endDate: string,
  datesArray: string[]
): { startIndex: number | null; endIndex: number | null } {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startIndex = datesArray.findIndex((dateString) => {
    const date = new Date(dateString);
    return date.getTime() === start.getTime();
  });

  const endIndex = datesArray.findIndex((dateString) => {
    const date = new Date(dateString);
    return date.getTime() === end.getTime();
  });
  return {
    startIndex: startIndex !== -1 ? startIndex : null,
    endIndex: endIndex !== -1 ? endIndex : null,
  };
}

export function createVlTimeArray(
  dates: Date[],
  value: number,
  startIndex: number,
  endIndex: number
) {
  const vlTimeArray = new Array(dates.length).fill(null);

  for (let i = startIndex; i <= endIndex; i++) {
    vlTimeArray[i] = value;
  }

  return vlTimeArray;
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US");
};
