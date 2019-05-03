import 'whatwg-fetch'

class TripMeHttpClient{
    
    getDiaryById= (diaryId)=>{
        var promise = new Promise((resolve, reject)=>{
            var url = new URL('http://localhost/TripMeWebApi/DiaryById')
            var httpQueryParams = {id: diaryId}
            url.search = new URLSearchParams(httpQueryParams)
        
            fetch(url).then((response)=>{
                resolve(response.json());
            })
        });
        
        return promise;
    }
    
    createNewDiary = (diary)=>{
        var promise =new Promise((resolve,reject)=>{
           var url = new URL('http://localhost/TripMeWebApi/AddNewDiary');
            
            fetch(url, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'},
                body: JSON.stringify(diary)
            }).then((response)=>{
                resolve(response);
            })
            });
        }
    
    getReviewTypes = ()=>{
        var promise = new Promise((resolve,reject)=>{
           var url = new URL('http://localhost/TripMeWebApi/ReviewTypes');
            
            fetch(url).then((response)=>{
               resolve(response.json()); 
            });
        });
        return promise;
    }
}

export default TripMeHttpClient;