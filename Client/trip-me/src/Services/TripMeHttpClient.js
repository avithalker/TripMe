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

  getPageList = diaryId => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL(
        "http://localhost/TripMeWebApi/Diary/DiaryMinimizedPageList"
      );
      var httpQueryParams = { diaryId: diaryId };
      url.search = new URLSearchParams(httpQueryParams);
      fetch(url).then(response => {
        resolve(response.json());
      });
    });

    return promise;
  };

  getDiariesBySearch = request => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL("http://localhost/TripMeWebApi/Diary/Search");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      }).then(response => {
        resolve(response.json());
      });
    });
    return promise;
  };

  getPageById = (diaryId, pageId) => {
    debugger;
    var promise = new Promise((resolve, reject) => {
      var url = new URL("http://localhost/TripMeWebApi/Diary/Page");
      var httpQueryParams = { diaryId: diaryId, pageId: pageId };
      url.search = new URLSearchParams(httpQueryParams);
      fetch(url).then(response => {
        resolve(response.json());
      });
    });

    return promise;
  };

  createNewDiary = diary => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL("http://localhost/TripMeWebApi/Diary/AddNewDiary");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(diary)
      }).then(response => {
        debugger;
        resolve(response.json());
      });
    });
    return promise;
  };

  addNewPage = addNewPageRequest => {
    var url = new URL("http://localhost/TripMeWebApi/Diary/AddNewPage");

    var promise = new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addNewPageRequest)
      }).then(response => {
        resolve(response.json());
      });
    });

    return promise;
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
