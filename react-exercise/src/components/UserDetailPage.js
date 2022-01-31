import { useState, useEffect } from "react";
import ListPage from "./ListPage";
import MyPagination from "./Pagination";
import { Spinner } from "react-bootstrap";

function UserDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [repoInfo, setRepoInfo] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [currURL, setCurrURL] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/mojombo")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrURL(data.repos_url);
        let total = data.public_repos / 10;
        total = Math.ceil(total);
        setTotalPages(total);
        setUserInfo(data);
        afterPageClicked(1);
      });
  }, [currURL]);

  const afterPageClicked = (page_number) => {
    setCurrPage(page_number);
    if (currURL) {
      fetch(currURL + `?page=${page_number}&per_page=10`)
        .then((resp) => {
          return resp.json();
        })
        .then((repoData) => {
          setIsLoading(false);
          setRepoInfo(repoData);
        });
    }
  };

  if (isLoading) {
    return (
      <div className="loadingSec">
        <Spinner animation="grow" />
        <span> Loading. Please Wait ...</span>
      </div>
    );
  }
  return (
    <div>
      <div className="imageSec">
        <div className="imgHolder">
          <img src={userInfo.avatar_url} alt={userInfo.name} />
        </div>
      </div>
      <div className="introSec">
        <h4>{userInfo.name}</h4>
        <p>{userInfo.bio ? userInfo.bio : userInfo.company}</p>
        <p>
          <i className="bi bi-pin-fill"></i> {userInfo.location}
        </p>
        <p>
          {userInfo.twitter_username
            ? "Twitter : https://twitter.com/" + userInfo.twitter_username
            : "Blog : " + userInfo.blog}
        </p>
      </div>
      <div className="repoLink">
        <i className="bi bi-link"></i>{" "}
        <a href={userInfo.html_url} target="_blank">
          {userInfo.html_url}
        </a>
      </div>
      {repoInfo.map((repo) => {
        return <ListPage key={repo.id} repoData={repo} />;
      })}
      <MyPagination
        totPages={totalPages}
        currentPage={currPage}
        pageClicked={(ele) => {
          afterPageClicked(ele);
        }}
      ></MyPagination>
    </div>
  );
}

export default UserDetailPage;
