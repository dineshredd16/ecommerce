class ApiFeatures {
  constructor(query, queryStr){
    this.query = query;
    this.queryStr = queryStr;
  };

  search(){
    const keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: "i",
      }
    } : {};
    this.query = this.query.find({...keyword});
    return this;
  };

  filter(){
    const queryStrCopy = {...this.queryStr};

    // removing some feilds for category filter
    const removeFeild = ["keyword", "page", "limit"];
    removeFeild.forEach((key) => delete queryStrCopy[key]);

    // filters for price and rating
    let queryStrCopy2 = JSON.stringify(queryStrCopy).replace(/\b(gt|lt|gte|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStrCopy2));
    return this;
  };

  pagination(){
    const perPage = Number(this.queryStr.perPage) || 10;
    const currentPage = Number(this.queryStr.page) || 1;
    const skipData = perPage*(currentPage - 1);
    this.query = this.query.limit(perPage).skip(skipData);
    return this;
  };

};

module.exports = ApiFeatures;