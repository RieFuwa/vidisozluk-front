function UserPostAct(){
    const [userPost, setUserPost] = useState([]);
    const [isLoadedPost, setIsLoadedPost] = useState(false);

    const getUserPost = async () => {
        await axios
          .get("/post/getAllUserPost?userId=" + userId)
          .then(function (response) {
            return response.data;
          })
          .then(
            (result) => {
              setUserPost(result);
              setIsLoadedPost(true);
            },
            (error) => {
              setError(true);
              setIsLoadedPost(true);
              console.log(error);
            }
          );
      };
    return(
        <div class="  grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 2xl:grid-cols-1 gap-12 p-4 ">
              {userPost.map((key, index) => (
                <div
                  key={index}
                  class="bg-white dark:bg-gray-800 w-96 shadow shadow-gray-500 mx-auto rounded-xl p-4"
                >
                  <div>
                    <p class="text-lime-600 font-semibold ">
                      PostId: {key.id} {key.postTitle}{" "}
                    </p>
                    <p class="row text-gray-600 dark:text-white">
                      {" "}
                      To get social media testimonials like these, keep your
                      customers engaged with your social media accounts by
                      posting regularly yourself
                    </p>
                    <div class="flex items-center mt-4">
                      <Link to={{ pathname: "/user/" + key.user.id }}>
                        <button class="relative block">
                          <img
                            alt="profil"
                            src="/images/person/1.jpg"
                            class="mx-auto object-cover rounded-full h-10 w-10 "
                          />
                        </button>
                      </Link>
                      <div class="flex flex-col justify-between ml-2">
                        <span class="text-sm flex items-center align-middle  text-lime-600">
                          <Link to={{ pathname: "/user/" + key.user.id }}>
                            <button>{key.user.userName}</button>
                          </Link>
                          &emsp;
                          <FaHeart class="text-lime-600 text-xl"> </FaHeart>
                          &nbsp; 11
                          <ReportTitle></ReportTitle>
                        </span>
                        <span class="flex items-center text-xs dark:text-gray-400">
                          {key.createDate}: &emsp; yorum sayısı:
                          <img src="/icons/rocket.svg" class="w-4 h-4 ml-2" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
    )
}
export default UserPostAct