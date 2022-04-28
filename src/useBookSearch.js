import axios from "axios";
import React, { useEffect, useState } from "react";

function useBookSearch(query, pageNo) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(()=>{
    setBooks([])
  },[query])

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNo },
    })
      .then((response) => {
        console.log(response.data);
        setBooks((prevBooks) => {
          return [...new Set([...prevBooks, ...response.data.docs.map((b) => b.title)])];
        })
        setHasMore(response.data.docs.length > 0)
        setLoading(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true)
      });
  
  }, [query, pageNo]);
  return {loading,error,books,hasMore};
}

export default useBookSearch;
