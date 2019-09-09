import { AuthenticationManager } from "../Utils/AuthenticationManager.js";
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
        if(!response.ok)
        {
          reject(response);
        }
        else
        {
          resolve(response.json());
        }
      });
    });
    return promise;
  };

  getPageById = (diaryId, pageId) => {
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

  editPage = (request) => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL("http://localhost/TripMeWebApi/Diary/EditPage");
      var authenticationManager = new AuthenticationManager();
      fetch(url, {
        method: "PUT",
        headers: {
          ...{ "Content-Type": "application/json" },
          ...authenticationManager.getAuthenticationHeader()
        },
        body: JSON.stringify(request)
      }).then((response) => {
        debugger;
        resolve(response.status);
      })
    })
    debugger;
    return promise;
  }

  createNewDiary = diary => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL("http://localhost/TripMeWebApi/Diary/AddNewDiary");
      var authenticationManager = new AuthenticationManager();
      fetch(url, {
        method: "POST",
        headers: {
          ...{ "Content-Type": "application/json" },
          ...authenticationManager.getAuthenticationHeader()
        },
        body: JSON.stringify(diary)
      }).then(response => {
        resolve(response.json());
      });
    });
    return promise;
  };

  addNewPage = addNewPageRequest => {
    var url = new URL("http://localhost/TripMeWebApi/Diary/AddNewPage");
    var authenticationManager = new AuthenticationManager();
    var promise = new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          ...{ "Content-Type": "application/json" },
          ...authenticationManager.getAuthenticationHeader()
        },
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

  getReviewsQuestionnaire = () => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL(
        "http://localhost/TripMeWebApi/Review/ReviewQuestionnaire"
      );
      fetch(url).then(response => {
        resolve(response.json());
      });
    });

    return promise;
  };

  getDiariesByUser = () => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL("http://localhost/TripMeWebApi/Diary/DiariesByUser");
      var authenticationManager = new AuthenticationManager();
      fetch(url, {
        method: "GET",
        headers: {
          ...{ "Content-Type": "application/json" },
          ...authenticationManager.getAuthenticationHeader()
        }
      }).then(response => {
        resolve(response.json());
      });
    });

    return promise;
  };

  register = registrationRequest => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL(
        "http://localhost/TripMeWebApi/Authentication/Register"
      );
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registrationRequest)
      }).then(response => {
        let responseData = response.json();
        if (response.ok) resolve(responseData);
        else {
          responseData.then(error => reject(error.Message));
        }
      });
    });
    return promise;
  };
  login = loginRequest => {
    var promise = new Promise((resolve, reject) => {
      var url = new URL("http://localhost/TripMeWebApi/Authentication/Login");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginRequest)
      }).then(response => {
        if (response.ok) resolve(response.json());
        reject(response);
      });
    });
    return promise;
  };
}

export default TripMeHttpClient;
