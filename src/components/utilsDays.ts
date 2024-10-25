import { Dispatch, SetStateAction } from "react";

export function isWorkDay(
  dates: (Date | string)[]
): { date: Date; isWeekend: boolean }[] {
  return dates.map((date) => {
    const validDate = typeof date === "string" ? new Date(date) : date;
    const isWeekend = validDate.getDay() === 0 || validDate.getDay() === 6;
    return { date: validDate, isWeekend };
  });
}

export function checkDatesRange(
  startDate: string,
  endDate: string,
  consumDate: string[] | undefined,
  datesArray: string[]
): {
  startIndex: number | null;
  endIndex: number | null;
  consumIndex: number[] | null;
} {
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

  const consumIndex = consumDate
    ? consumDate
        .map((consum) => {
          return datesArray.findIndex((dateString) => {
            const date = new Date(dateString);
            return date.getTime() === new Date(consum).getTime();
          });
        })
        .filter((index) => index !== -1)
    : [];

  return {
    startIndex: startIndex !== -1 ? startIndex : null,
    endIndex: endIndex !== -1 ? endIndex : null,
    consumIndex: consumIndex.length > 0 ? consumIndex : null,
  };
}

export function findMatchingDates(
  datesArray: string[] | undefined,
  consumDate: string[] | undefined
): Record<string, number[]> {
  if (
    !consumDate ||
    consumDate.length === 0 ||
    !datesArray ||
    datesArray.length === 0
  ) {
    return {};
  }

  const matchingDates: Record<string, number[]> = {};

  consumDate.forEach((consum) => {
    const consumDateObj = new Date(consum);

    datesArray.forEach((dateString, index) => {
      const datesArrayObj = new Date(dateString);
      if (
        consumDateObj.getFullYear() === datesArrayObj.getFullYear() &&
        consumDateObj.getMonth() === datesArrayObj.getMonth() &&
        consumDateObj.getDate() === datesArrayObj.getDate()
      ) {
        // Adiciona o índice ao array correspondente à data
        if (!matchingDates[consum]) {
          matchingDates[consum] = [];
        }
        matchingDates[consum].push(index);
      }
    });
  });

  return matchingDates;
}

export function createVlTimeArray(
  dates: string[],
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

export const formatDateEn = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateBr = (isoString: Date | string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR");
};
