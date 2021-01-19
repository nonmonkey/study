var hyphenate = function (str) {
  return str.replace(/\B([A-Z])/g, function (_, $1) {
    return $1 ? `-${$1.toLowerCase()}` : '';
  });
};
