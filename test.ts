import {
  formatPrice,
  getGenitive,
  getGroups,
  getUsers,
  isEmailValid,
  isLowerCase,
  isPrimeNumber,
  isZipCodeValid,
  makeHeading,
} from './functions';


test('isEmailValid()', () => {
  expect(isEmailValid('petra.eriksson@gmail.com')).toBe(true);
  expect(isEmailValid('iths@google.com')).toBe(true);

  expect(isEmailValid('petra.erikssongmail.com')).toBe(false);
  expect(isEmailValid('gmail.com')).toBe(false);
  expect(isEmailValid('petra.eriksson@gmailcom')).toBe(false);
});

test('isZipCodeValid()', () => {
  expect(isZipCodeValid('12445')).toBe(true);
  expect(isZipCodeValid('12445')).toBe(true);
  expect(isZipCodeValid('124 45')).toBe(true);

  expect(isZipCodeValid('1244')).toBe(false);
  expect(isZipCodeValid('124457')).toBe(false);
  expect(isZipCodeValid('1245 67')).toBe(false);
  expect(isZipCodeValid('abc56')).toBe(false);
});

test('makeHeading()', () => {
  expect(makeHeading('Test', 1)).toBe('<h1>Test</h1>');
  expect(makeHeading('Tomorrow', 2)).toBe('<h2>Tomorrow</h2>');
  expect(makeHeading('Yesterday', 3)).toBe('<h3>Yesterday</h3>');
  expect(makeHeading('Today', 4)).toBe('<h4>Today</h4>');

  expect(() => makeHeading('Test', 0)).toThrow();
  expect(() => makeHeading('Test', -1)).toThrow();
  expect(() => makeHeading('Test', 7)).toThrow();
});

test('formatPrice()', () => {
  expect(formatPrice(232.10542, '%PRICE% kr')).toBe('232.11 kr');
  expect(formatPrice(299.3984, '%PRICE% NOK')).toBe('299.40 NOK');
  expect(formatPrice(25.44, '$%PRICE%')).toBe('$25.44');
  expect(formatPrice(100.1, '%PRICE%')).toBe('100.10');
  expect(formatPrice(123, 'USD %PRICE%')).toBe('USD 123.00');

  expect(() => formatPrice(-1, '%PRICE%')).toThrow();
  expect(() => formatPrice(123, 'NOK ')).toThrow();
});

test('isLowerCase()', () => {
  expect(isLowerCase('petra')).toBe(true);
  expect(isLowerCase('petra eriksson')).toBe(true);
  expect(isLowerCase('petra eriksson 123')).toBe(true);
  expect(isLowerCase('petra eriksson 123 !')).toBe(true);

  expect(isLowerCase('Petra')).toBe(false);
  expect(isLowerCase('Petra Eriksson')).toBe(false);
  expect(isLowerCase('Petra Eriksson 123')).toBe(false);
});

test('isPrimeNumber()', () => {
  expect(isPrimeNumber(3)).toBe(true);
  expect(isPrimeNumber(31)).toBe(true);
  expect(isPrimeNumber(67)).toBe(true);

  expect(isPrimeNumber(-31)).toBe(false);
  expect(isPrimeNumber(30)).toBe(false);
  expect(isPrimeNumber(22)).toBe(false);
});

test('getGenitive()', () => {
  expect(getGenitive('Petra')).toBe('Petras');
  expect(getGenitive('Jonatan')).toBe('Jonatans');
  expect(getGenitive('Mikael')).toBe('Mikaels');
  expect(getGenitive('Hampus')).toBe('Hampus');
});

test('getUsers()', async () => {
  const users = await getUsers();

  expect(users.length).toBe(6);
  expect(users[0].name).toBe('Erik');
  expect(users[0].group).toBe(1);
  expect(users[5].name).toBe('Anna');
  expect(users[5].group).toBe(3);
});

test('getGroups()', async () => {
  const groups = await getGroups();

  expect(groups.length).toBe(3);
  expect(groups[0].id).toBe(1);
  expect(groups[0].groupName).toBe('Hajarna');
  expect(groups[2].id).toBe(3);
  expect(groups[2].groupName).toBe('Zebrorna');
});