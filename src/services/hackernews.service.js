export function fetchFrontPageStories (pageNo) {
    let url = "https://hn.algolia.com/api/v1/search?tags=front_page&page=" + pageNo;
      
    return new Promise(function(resolve, reject) {
        fetch(url)
        .then((res) => res.json())
        .then(
            (result) => {
                resolve(result);
            },
            (error) => {
                reject(error);
            }
        );
    });
}