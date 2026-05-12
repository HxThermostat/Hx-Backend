const type = {
  m: "margin",
  p: "padding",
};

const side = {
  l: "left",
  r: "right",
  t: "top",
  b: "bottom",
  x: "horizontal",
  y: "vertical",
  a: "all",
};

export const size = {
  z: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  eight: 8,
  nine: 9,
  ten: 10,
  twelve: 12,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  eighteen: 18,
  twenty: 20,
  twentytwo: 22,
  twentyfour: 24,
  twentysix: 26,
  twentyeight: 28,
  thirty: 30,
  thirtytwo: 32,
  fortytwo: 42,
  fortyeight: 48,
  fiftyfour: 54,
  sixtyfour: 64,
  seventyfive: 75,
  onehundredeighty: 180,
};

interface Spacing {
  [key: string]: {
    [key: string]: number;
  };
}
const spacing: Spacing = {};

/**
 * below block is not too pretty, but doesn't need to be - it's only called once
 * generates a style object that we can use to declare all standardized spacings through the app

 * e.g. ...spacing.mrtwelve === marginRight: 12
 * e.g. ...spacing.mxtwentyfour === marginHorizontal: 24
 
 * this is a simple way to ensure all white space is consistent and is easier on the eyes than manually typing out spacing each time
 * simply spread into stylesheets and we're good to go
 * const styles = StyleSheet.create({
  container: {
    ...spacing.mhtwelve,
    backgroundColor: colors.background
  }
  
  The ultimate goal is to not have any hardcoded numbers in stylesheets (except for special circumstances potentially)
})
 */

Object.entries(type).forEach(([typeKey, typeValue]) => {
  Object.entries(side).forEach(([sideKey, sideValue]) => {
    Object.entries(size).forEach(([sizeKey, sizeValue]) => {
      const camelized = sideValue.charAt(0).toUpperCase() + sideValue.slice(1);
      spacing[`${typeKey}${sideKey}${sizeKey}`] = {
        [`${typeValue}${camelized}`]: sizeValue,
      };
      if (!spacing[`${typeKey}${sizeKey}`]) {
        // add an for 'all'
        spacing[`${typeKey}a${sizeKey}`] = {
          [`${typeValue}`]: sizeValue,
        };
      }
    });
  });
});

export default spacing;
