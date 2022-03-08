import React from "react";
import { useSelector } from "react-redux";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import LoadIcon from "../images/loading.gif";

const Home = () => {
  const { homePost, theme } = useSelector((state) => state);
  return (
    <div className="home row mx-0">
      <div
        className="col-md-2"
        style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}>
        <div
          className="ns-xjvxg-e-3 title-line1"
          title="TopCV"
          x-ns-xjvxg-e={3}
          x-overflow-forbidden="xy">
          <a
            className="ns-op93l-e-11"
            data-asoch-targets="ad0,ochTitle"
            dir="auto"
            href="https://www.googleadservices.com/pagead/aclk?sa=L&ai=CuRdZtOkeYtGyJ6S1z7sPkPSomAqdzvveaOeh3u-5D9nZHhABINeQl0xgwbX6DaABzKzYiAPIAQmpAmAjWHT2F8g9qAMByAPLBKoE0gFP0CCeOMjuxKzlALhcdeg48ZdzTUFhtW5rRz5Di1qPOUnlY1RNXR1j_PdFKJuISAAcubBdW1bjh7wN8tM4wtEq_LfGMEqe56IAhpIiMVrHA5KXun5SOlJgOYJqoKqhcFYdPFTcBWzt4fIcOalDtLdUY1yn9QC2KHHysX97kXqvmowtkNFUvvSJe3tZY3kzB-wgRiWuRHKE6YNuPg0t0mStqMAnpL7TLQg9iUvBW0hsTGykJYMWgt_JCJxhiuLSy68uyYHDkXoQjKtttUQvMzRH1CjABKiE_ojgA5AGAaAGLoAHnNOnd4gHAZAHAqgHjs4bqAeT2BuoB-6WsQKoB_6esQKoB6SjsQKoB9XJG6gHpr4bqAfz0RuoB5bYG6gHqpuxAqgH35-xAtgHANIIBggAEAIYGrEJEZEyOV0koYeACgGYCwHICwGADAG4DAHYEwOIFATQFQGYFgH4FgGAFwE&ae=1&num=1&cid=CAMSeQClSFh3V5VU_c9BrRpZDKq8K_tjHmRKM9CMj3WhnT8OJuE6m2ibII64I6CZWSWTY5ndBpX1lyikM-TJBJAGF8zz_DvvGjey2gkL9DLSvhBnvCjK-ZIxhkk7nEXI2C2b_2zwxMO-CaGDkxqg3Idg-Q2h_ZGhdUExmSM&sig=AOD64_05ldK1r2fNAM4i0wAKa5vov9DLVw&client=ca-pub-8832765085554714&nb=0&adurl=https://www.topcv.vn/viec-lam%3Ftracking%3D1%26source%3Dgg%26gclid%3DCjwKCAiApfeQBhAUEiwA7K_UHyIwtIUAhruJryY8s8N2p3brvkQgVIUv2qEj0OHeqxFOfI_uzkzsKxoCnSEQAvD_BwE"
            target="_top"
            x-ns-op93l-e={11}
            x-score={2}>
            Tìm việc làm phù hợp với TopCV
            <img
              src="https://tpc.googlesyndication.com/simgad/17409567335894799938?sqp=4sqPyQQrQikqJwhfEAEdAAC0QiABKAEwCTgDQPCTCUgAUAFYAWBfcAJ4AcUBLbKdPg&rs=AOga4qnigrdk3Id63YjQdQB-zIJ5TXYXbw"
              alt="https://tpc.googlesyndication.com/simgad/17409567335894799938?sqp=4sqPyQQrQikqJwhfEAEdAAC0QiABKAEwCTgDQPCTCUgAUAFYAWBfcAJ4AcUBLbKdPg&rs=AOga4qnigrdk3Id63YjQdQB-zIJ5TXYXbw"
            />
          </a>
        </div>
      </div>
      <div className="col-md-6">
        <Status />
        {homePost.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePost.result === 0 && homePost.posts.length === 0 ? (
          <h2 className="text-center">No Post</h2>
        ) : (
          <Posts />
        )}
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default Home;
