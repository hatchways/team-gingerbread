/* eslint-disable @typescript-eslint/no-explicit-any */

const getFakeData = async (numberOfUsers: number): Promise<Array<any>> => {
  const promises: Array<Promise<any>> = [];

  for (let i = 0; i < numberOfUsers; i += 1) {
    promises.push(
      fetch('https://randomuser.me/api')
        .then((res) => res.json())
        .then((res) => res.results),
    );
  }

  try {
    return await Promise.all(promises);
  } catch (e) {
    throw new Error(`${e}`);
  }
};

const generateMockData = async (numberOfUsers: number): Promise<any> => {
  return await getFakeData(numberOfUsers);
};

export default generateMockData;
