/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import { useSelector } from "react-redux";
const Home = () => {
  const [data, setData] = useState([]);
  const [isData, setisData] = useState(false);
  const api = useAxios();
  const baseUrl = useSelector((state) => state.baseUrl.url);
  const getData = async () => {
    try {
      const response = await api.get(`${baseUrl}/api/get_top_stories`);
      setData(response.data.message.results);
      setisData(true);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="album py-5 bg-light">
        <div className="container">
          {isData === false ? (
            <div
              className="container"
              id="spinner_loader"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {data.map((news) => {
                return (
                  <div className="col" key={news.created_date}>
                    <div className="card shadow-sm">
                      <a href={`${news.url}`} target="_blank">
                        <img
                          className="bd-placeholder-img card-img-top"
                          width="100%"
                          height="225"
                          src={`${news.multimedia[1].url}`}
                          focusable="false"
                        ></img>
                      </a>
                      <div className="card-body">
                        <h6>{news.title.slice(0, 50)}....</h6>
                        <p className="card-text">
                          {news.abstract.slice(0, 90)}....
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <a
                              type="button"
                              className="btn btn-primary"
                              href={`${news.url}`}
                              target="_blank"
                            >
                              View
                            </a>
                          </div>
                          <small className="text-muted">
                            {news.published_date.split("T")[1].split("-")[0]}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
