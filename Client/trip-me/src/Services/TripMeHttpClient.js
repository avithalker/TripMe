import "whatwg-fetch";

class TripMeHttpClient {
  getDiaryById = diaryId => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL("http://localhost/TripMeWebApi/Diary/DiaryById");
      var httpQueryParams = { id: diaryId };
      url.search = new URLSearchParams(httpQueryParams);
      fetch(url).then(response => {
        resolve(response.json());
      });
    });

    return promise;
  };

  createNewDiary = diary => {
    var url = new URL("http://localhost/TripMeWebApi/Diary/AddNewDiary");
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(diary)
    });
  };

  addNewPage = addNewPageRequest => {
    var url = new URL("http://localhost/TripMeWebApi/Diary/AddNewPage");

    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewPageRequest)
    });
  };

  getReviewTypes = () => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL("http://localhost/TripMeWebApi/Review/ReviewTypes");

      fetch(url).then(response => {
        resolve(response.json());
      });
    });
    return promise;
  };

  getReviewQuestionnaireById = reviewTypeId => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL(
        "http://localhost/TripMeWebApi/Review/ReviewQuestionnaireById"
      );
      var httpQueryParams = { reviewTypeId: reviewTypeId };
      url.search = new URLSearchParams(httpQueryParams);

      fetch(url).then(response => {
        resolve(response.json());
      });
    });

    return promise;
  };

  getDiariesByUser = () => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL("http://localhost/TripMeWebApi/Diary/DiariesByUser");
      fetch(url).then(response => {
        resolve(response.json());
      });
    });

    return promise;
  };
}

export default TripMeHttpClient;
