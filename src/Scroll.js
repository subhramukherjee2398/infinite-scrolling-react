import React, { useCallback, useRef, useState } from "react";
import useBookSearch from "./useBookSearch";

function Scroll() {
  const [query, setQuery] = useState("");
  const [pageNo, setPageNo] = useState(1);
  console.log(query);

  const observer = useRef();
  const lastBookelementRef = useCallback((node) => {
    if(loading) return 
    if(observer.current){
      observer.current.disconnect()
    }
    observer.current =  new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        console.log('visible')
      }
    })
    if(node){
      observer.current.observer(node)
    }
    console.log({node})
  },[loading,hasMore]);

  const { loading, error, books, hasMore } = useBookSearch(query, pageNo);
  console.log({ books });
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPageNo(1);
          }}
        />
      </div>
      <div>
        {books.map((book, index) => {
          if (book.length === index + 1) {
            return (
              <div ref={lastBookelementRef} key={book}>
                {book}
              </div>
            );
          } else {
            return <div key={book}>{book}</div>;
          }
        })}
      </div>
      <div>{loading && "loading...."}</div>
      <div>{error && "error..."}</div>
    </div>
  );
}

export default Scroll;
