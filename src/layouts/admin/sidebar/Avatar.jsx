
const Avatar = ({name, imagepath}) => {
    return (
        <div>
            <li className="pt-1 pb-2 d-flex flex-column avatar_li position-relative">
            <span className="avatar_box">
              <img
                className="w-100 rounded-circle"
                src={imagepath}
              />
            </span>
            <div className="sidebar_avatar_name text-center hiddenable">
               {name}
            </div>
          </li>
        </div>
    );
};

export default Avatar;