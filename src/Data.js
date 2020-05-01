import React from "react";
import ReactDOM from "react-dom";

let gAlbums, gArtists, gSongs;
class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      Songs: [],
      Artists: [],
      Albums: [],
    };
  }

  render() {
    return (
      <div className="container row col-12 mt-4">
        <div className="col-6">
          <h2>Artists List :</h2>
          <ul>
            {this.state.Artists.map((artist) => (
              <li key={artist.artistId}>{artist.artistName}</li>
            ))}
          </ul>
        </div>
        <div className="col-6">
          <h2>Albums List :</h2>
          <ul>
            {this.state.Albums.map((album) => (
              <li key={album.AlbumId}>{album.albumName}</li>
            ))}
          </ul>
        </div>

        <div className="col-12">
          <h2>Songs List :</h2>

          <table className="table table-border">
            <thead>
              <tr>
                <th>Songs</th>
                <th>Artists</th>
                <th>Albums </th>
              </tr>
            </thead>
            <tbody>
              {this.state.Songs.map((song) => (
                <tr key={"row_" + song.id}>
                  <td key={"song_" + song.id}>{song.songsName}</td>
                  <td key={"artist_" + song.artistId}>{song.ArtistName}</td>
                  <td key={"album_" + song.AlbumId}>{song.AlbumName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    const headers = {
      "Content-Type": "application/json",
    };
    var ths = this;

    fetch("http://localhost:8000/artists/?format=json", { headers })
      .then((artistsResponse) => artistsResponse.json())
      .then((artistsdata) => {
        if (
          artistsdata != null &&
          artistsdata != undefined &&
          artistsdata.length > 0
        ) {
          gArtists = artistsdata;
          ths.setState({ Artists: gArtists });

          fetch("http://localhost:8000/albums/?format=json", { headers })
            .then((albumsresponse) => albumsresponse.json())
            .then((albumData) => {
              if (
                albumData != null &&
                albumData != undefined &&
                albumData.length > 0
              ) {
                gAlbums = albumData;
                ths.setState({ Albums: gAlbums });

                fetch("http://localhost:8000/songs/?format=json", { headers })
                  .then((songsResponse) => songsResponse.json())
                  .then((songsData) => {
                    if (
                      songsData != null &&
                      songsData != undefined &&
                      songsData.length > 0
                    ) {
                      gSongs = songsData;

                      for (var i = 0; i < gSongs.length; i++) {
                        let album = gAlbums.filter((l) => {
                          return l.AlbumId == gSongs[i].AlbumId;
                        });
                        let artist = gArtists.filter((l) => {
                          return l.artistId == gSongs[i].artistId;
                        });
                        gSongs[i]["ArtistName"] = "";
                        if (
                          artist != null &&
                          artist != undefined &&
                          artist.length > 0
                        )
                          gSongs[i]["ArtistName"] = artist[0].artistName;

                        gSongs[i]["AlbumName"] = "";
                        if (
                          album != null &&
                          album != undefined &&
                          album.length > 0
                        )
                          gSongs[i]["AlbumName"] = album[0].albumName;
                      }
                      ths.setState({ Songs: gSongs });
                    }
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
}

export default Data;
