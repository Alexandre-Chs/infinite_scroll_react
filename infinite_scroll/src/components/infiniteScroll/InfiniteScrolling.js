import React, { useState, useEffect, Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const InfiniteScrolling = () => {
  const [data, setData] = useState({
    photos: [],
    page: 2,
    items: 15,
    hasMore: true,
    author: "",
  });

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = () => {
    axios
      .get(`https://picsum.photos/v2/list?page=${data.page}&limit=15`)
      .then((response) => {
        setData({
          ...data,
          photos: data.photos.concat(response.data),
          page: data.page + 1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const photoData = data.photos.map((element, index) => (
    <div key={index} className="box">
      <img src={element.download_url} alt={`image of ${element.author}`}></img>
    </div>
  ));

  return (
    <div>
      <div className="grid">
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={data.photos.length}
          next={getPhotos}
          hasMore={
            data.page >= 15 ? (data.hasMore = false) : (data.hasMore = true)
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="container">{photoData}</div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InfiniteScrolling;
