import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import clrLogo from "./assets/logo colored-01.png";
import profileImg from "./assets/profile icon-01.png";
import hitItImg from "./assets/hit it-01.png";
import unClrLogo from "./assets/logo white-01.png";
import fadel from "./assets/Fadel Shaker.jpeg";

const QUERY_ALBUMS = gql`
  query {
    albums {
      AlbumId
      albumName
    }
  }
`;

function AlbumInfo() {
  const { data, loading } = useQuery(QUERY_ALBUMS, {
    pollInterval: 60 * 60 * 60000,
  });

  let style = {
    logo: { width: 15 + "%" },
    whiteLogo: { width: 70 + "%" },
    profile: { width: 200 + "%" },
    Card: { width: 200 + "px", height: 300 + "px" },
    hitIt: {
      height: 100 + "px",
      width: 190 + "px",
      margin: "30px 0px 0px -55px",
    },
    margin8: { marginLeft: 8 + "% " },
    margin7: { marginLeft: 7 + "% " },
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img className="rounded " src={clrLogo} style={style.logo} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  PROFILE
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link icon">
                  <i>
                    <img
                      className="rounded "
                      src={profileImg}
                      style={style.profile}
                    />
                  </i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <div className="jumbotron jumbotron-fluid">
          <div className="row  mx-auto container">
            <div className="col-12 col-md-4">
              <h1 className="display-4 mt-3">
                AMP UP
                <br />
                THOSE DBS
              </h1>
              <p className="lead">MAKE MUSIC ON THE GO</p>

              <img className="rounded" src={hitItImg} style={style.hitIt} />
            </div>
            <div className="col-12 col-md-8 row m-0 ">
              <div className="col-12 col-md-4">
                <div className="card d-flex">
                  <img className="rounded" src={fadel} style={style.Card} />
                </div>
              </div>
              {data.albums.map(({ AlbumId, albumName }) => (
                <div className="col-12 col-md-4" key={AlbumId}>
                  <div className="card d-flex">{albumName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="container col-12">
        <div className="row col-12">
          <div className="col-7 mt-5 ml-6" style={style.margin8}>
            <p className="h1">GET PRODUCIN WITH MUSICDB</p>
            <br></br>
            <p className="h3">PICK YOUR PREFEREF INSTRUMENT</p>
            <p className="h5">
              PICK THE INSTRUMENTS YOU NEED TO COMPOSE YOUR PIECE
            </p>
            <br></br>
            <p className="h6 text-danger">START COMPOSING</p>
          </div>
        </div>
        <div id="footer" className="row col-12 mt-5">
          <div className="row col-10  nav flex-column m-4">
            <div className="row">
              <div className="col-3 mt-2" style={style.margin8}>
                <img
                  className="rounded float-left"
                  src={unClrLogo}
                  style={style.whiteLogo}
                />
              </div>
              <div className="col-7 mt-5">
                <div className="col-2 m-1">
                  <a className="text-white px-2" href="#">
                    PROFILE
                  </a>
                  <br />
                </div>
                <div className="col-2 m-1">
                  <a className="text-white px-2" href="#">
                    SIGNIN
                  </a>
                  <br />
                </div>
                <div className="col-6 m-1">
                  <a className="text-white px-2" href="#">
                    MUSIC
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row col-10" style={style.margin7}>
            <div className="col-8 mr-5 ">
              <a className="text-white px-2" href="#">
                LEGAL
              </a>
              <a className="text-white px-2" href="#">
                PRIVACY CENTER
              </a>
              <a className="text-white px-2" href="#">
                PRIVACY POLICY
              </a>
              <a className="text-white px-2" href="#">
                COOKIES
              </a>
              <a className="text-white px-2" href="#">
                ABOUT US
              </a>
            </div>
            <div className="col float-right ml-5">&copy; 2020 MISICDB</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AlbumInfo;
