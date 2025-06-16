import React from 'react'
import Slider from "react-slick";
import profileicon from "../images/profile1.png";
import { MdOutlineStarPurple500 } from "react-icons/md";
import './Rating.css'

const Rating = () => {
    const profilesettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const profiles = [
    {
      name: "Cristian L.",
      position: "Manager",
      review:
        "Best services ever-Flags, programs for exceptional capacities, birthday, and are largely still mainstream on paper occasion welcome.",
    },
    {
      name: "Samantha J.",
      position: "Designer",
      review:
        "Amazing creativity and timely delivery. Our go-to company for events!",
    },
    {
      name: "David M.",
      position: "Team Lead",
      review:
        "Professional team and high-quality services. Really impressed.",
    },
    {
      name: "Emma W.",
      position: "Sales",
      review:
        "Their team exceeded expectations. Great customer support!",
    },
    {
      name: "Lucas G.",
      position: "HR",
      review:
        "Helpful, responsive and creative solutions always.",
    },
    {
      name: "Olivia P.",
      position: "Developer",
      review:
        "Their work helped boost our engagement by 40%. Superb service.",
    },
  ];
  return (
    <>
    <div className="rating mt-0">
         <div className='w-75'>
        <h1 className="heading-textone ratingboxstart">
          <span>What {}</span>
          <span style={{ color: "#007fff" }}>Pepole Are Saying</span>
        </h1>
        <p className='ratingtexttwo'>
          We provide support for more than 15K+ Businesses.
        </p>
        </div>

        <div className="comment-box container p-2">
      <Slider {...profilesettings}>
        {profiles.map((profile, index) => (
          <div className="col-lg-4 px-2 py-2" key={index}>
            <div className="comment-lines">
              <div className="profile-name" style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div className="profile-icon"
                style={{
      width: 60,
      height: 60,
      minWidth: 60,              // Prevents shrinking
      borderRadius: "50%",
      overflow: "hidden",
      border: "1px solid black",
      flexShrink: 0,             // Keeps image same size
    }}>
                  <img
                    src={profileicon}
                    alt="profile"
                    style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",       // Ensures image fills the circle
      }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    margin: 15,
                  }}
                >
                  <p style={{ margin: 0 }}>
                    {profile.name} <span>{profile.position}</span>
                  </p>
                  <span style={{ display: "flex", color: "#f4b92d" }}>
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                  </span>
                </div>
              </div>
              <div className="profile-about">
                <p className="mt-3">{profile.review}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
      </div>
    </>
  )
}

export default Rating