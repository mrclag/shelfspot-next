import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const ProfileItem = ({
  profile,
  // interests,
  // imgUrl,
  // bio,
}) => {
  const { id, name, email, imageUrl, books } = profile;
  console.log(profile);
  return (
    <Link href={`/profiles/${id}`}>
      <div className="profile-item">
        <img src={imageUrl} alt="" className="avatar" />
        <div className="profile-info">
          <div className="name">{name || email}</div>
          <div style={{ marginTop: "5px", color: "#555", fontSize: "14px" }}>
            {books?.length || "0"} Books
          </div>
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
