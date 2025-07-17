const teamMembers = [
  {
    name: "Chhom Senghour",
    role: "Team leader",
    imageSrc: "images/senghour.jpg",
  },
  {
    name: "Rotha Sinath",
    role: "Team Member",
    imageSrc: "images/sinath.jpg",
  },
  {
    name: "Ly kimheng",
    role: "Team Member",
    imageSrc: "images/kimheng.jpg",
  },
  {
    name: "Yong Vesal",
    role: "Team member",
    imageSrc: "images/vesal.jpg",
  },
  {
    name: "Our Menghuor",
    role: "Team member",
    imageSrc: "images/menghour.jpg",
  },
];

const teamContainer = document.getElementById("team-container");

teamMembers.forEach((member) => {
  const memberDiv = document.createElement("div");
  memberDiv.className = "team-member";
  memberDiv.innerHTML = `
    <img src="${member.imageSrc}" alt="${member.name}">
    <div class="member-info">
      <h3>${member.name}</h3>
      <p><u>${member.role}</u></p>
    </div>
  `;
  teamContainer.appendChild(memberDiv);
});
