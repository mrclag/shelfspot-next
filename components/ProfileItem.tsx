import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const ProfileItem = ({
  profile: { id, name, email },
  // interests,
  // imgUrl,
  // bio,
}) => {
  return (
    <Link href={`profile/${id}`}>
      <div className="profile-item">
        {/* <img src={imgUrl} alt="" className="avatar" /> */}
        <div className="profile-info">
          <div className="name">{name || email}</div>
          {/* <p>{bio && (bio.length < 80 ? bio : bio.slice(0, 100) + '...')}</p> */}
        </div>
        {/* <i className="fas fa-ellipsis-h"></i> */}
      </div>
    </Link>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
