// const titktokUsername = "mps_militanprabowo_s";
let msgId;
const username = "admin";
const password = "supersecret";

const connectSocket = (titktokUsername) => {
  const url = `https://tiktoktu.mitrajavapulsa.com/connectLive/${titktokUsername}/1234/TEBAK`;
  const headers = new Headers();
  headers.append("Authorization", "Basic " + btoa(username + ":" + password));

  const key1 = sessionStorage.getItem("key1");
  const key2 = sessionStorage.getItem("key2");
  const key3 = sessionStorage.getItem("key3");
  const key4 = sessionStorage.getItem("key4");

  sessionStorage.setItem("memberKey1", JSON.stringify([]));
  sessionStorage.setItem("memberKey2", JSON.stringify([]));
  sessionStorage.setItem("memberKey3", JSON.stringify([]));
  sessionStorage.setItem("memberKey4", JSON.stringify([]));
  sessionStorage.setItem("idMemberKey1", JSON.stringify([]));
  sessionStorage.setItem("idMemberKey2", JSON.stringify([]));
  sessionStorage.setItem("idMemberKey3", JSON.stringify([]));
  sessionStorage.setItem("idMemberKey4", JSON.stringify([]));

  if (!key1 || key1.length === 0) {
    return Swal.fire({
      title: "Failed!",
      text: "Masukan key slot 1!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  if (!key2 || key2.length === 0) {
    return Swal.fire({
      title: "Failed!",
      text: "Masukan key slot 2!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  if (!key3 || key3.length === 0) {
    return Swal.fire({
      title: "Failed!",
      text: "Masukan key slot 3!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  if (!key4 || key4.length === 0) {
    return Swal.fire({
      title: "Failed!",
      text: "Masukan key slot 4!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const socket = io("https://tiktok.mitrajavapulsa.com", { secure: true });

      socket.on("connect", () => {
        $("#status-connect").html("Tersambung");
        $("#status-connect").css("color", "green");
        console.log("Terhubung ke server");
      });

      socket.on("chat", (arg) => {
        if (arg.room === `room_${titktokUsername}`) {
          if (msgId !== arg.message.msgId) {
            if (
              arg.message.comment.toLowerCase().includes(key1.toLowerCase()) &&
              !JSON.parse(sessionStorage.getItem("idMemberKey1")).includes(
                arg.message.userId
              )
            ) {
              sessionStorage.setItem(
                "memberKey1",
                JSON.stringify(
                  JSON.parse(sessionStorage.getItem("memberKey1")).concat(
                    arg.message
                  )
                )
              );
              sessionStorage.setItem(
                "idMemberKey1",
                JSON.stringify(
                  JSON.parse(sessionStorage.getItem("idMemberKey1")).concat(
                    arg.message.userId
                  )
                )
              );

              const memberKey1UI = $("#member-area-1").children().children().length;

              if (memberKey1UI % 3 === 0) {
                const newDiv = $("<div>");
                newDiv.append(
                  "<div style='background-image: url("+ arg.message.profilePictureUrl +")' class='profile-member-non-vip animate__animated animate__backInUp animate__sp'></div>"
                );
                $("#member-area-1").append(newDiv);
              } else {
                $("#member-area-1")
                  .children()
                  .last()
                  .append(
                    "<div style='background-image: url("+ arg.message.profilePictureUrl +")' class='profile-member-non-vip animate__animated animate__backInUp animate__sp'></div>"
                  );
              }
            }

            if (
              arg.message.comment.toLowerCase().includes(key2.toLowerCase()) &&
              !JSON.parse(sessionStorage.getItem("idMemberKey2")).includes(
                arg.message.userId
              )
            ) {
              sessionStorage.setItem(
                "memberKey2",
                JSON.stringify(
                  JSON.parse(sessionStorage.getItem("memberKey2")).concat(
                    arg.message
                  )
                )
              );
              sessionStorage.setItem(
                "idMemberKey2",
                JSON.stringify(
                  JSON.parse(sessionStorage.getItem("idMemberKey2")).concat(
                    arg.message.userId
                  )
                )
              );

              const memberKey2UI = $("#member-area-2").children().children().length;

              if (memberKey2UI % 3 === 0) {
                const newDiv = $("<div>");
                newDiv.append(
                  "<div style='background-image: url("+ arg.message.profilePictureUrl +")' class='profile-member-non-vip animate__animated animate__backInUp animate__sp'></div>"
                );
                $("#member-area-2").append(newDiv);
              } else {
                $("#member-area-2")
                  .children()
                  .last()
                  .append(
                    "<div style='background-image: url("+ arg.message.profilePictureUrl +")' class='profile-member-non-vip animate__animated animate__backInUp animate__sp'></div>"
                  );
              }
            }

            if (
              arg.message.comment.toLowerCase().includes(key3.toLowerCase()) &&
              !JSON.parse(sessionStorage.getItem("idMemberKey3")).includes(
                arg.message.userId
              )
            ) {
              sessionStorage.setItem(
                "memberKey3",
                JSON.stringify(
                  JSON.parse(sessionStorage.getItem("memberKey3")).concat(
                    arg.message
                  )
                )
              );
              sessionStorage.setItem(
                "idMemberKey3",
                JSON.stringify(
                  JSON.parse(sessionStorage.getItem("idMemberKey3")).concat(
                    arg.message.userId
                  )
                )
              );

              const memberKey3UI = $("#member-area-3").children().children().length;

              if (memberKey3UI % 3 === 0) {
                const newDiv = $("<div>");
                newDiv.append(
                  "<div style='background-image: url("+ arg.message.profilePictureUrl +")' class='profile-member-non-vip animate__animated animate__backInUp animate__sp'></div>"
                );
                $("#member-area-3").append(newDiv);
              } else {
                $("#member-area-3")
                  .children()
                  .last()
                  .append(
                    "<div style='background-image: url("+ arg.message.profilePictureUrl +")' class='profile-member-non-vip animate__animated animate__backInUp animate__sp'></div>"
                  );
              }
            }

            if (
              arg.message.comment.toLowerCase().includes(key4.toLowerCase()) &&
              !JSON.parse(sessionStorage.getItem("idMemberKey4")).includes(
                arg.message.userId
              )
            ) {
              sessionStorage.setItem(
                "memberKey4",
                JSON.stringify(
                  JSON.parse(sessionStorage.getItem("memberKey4")).concat(
                    arg.message
                  )
                )
              );
              sessionStorage.setItem(
                "idMemberKey4",
                JSON.stringify(
                  JSON.parse(sessionStorage.getItem("idMemberKey4")).concat(
                    arg.message.userId
                  )
                )
              );

              const memberKey4UI = $("#member-area-4").children().children().length;

              if (memberKey4UI % 3 === 0) {
                const newDiv = $("<div>");
                newDiv.append(
                  "<div style='background-image: url("+ arg.message.profilePictureUrl +")' class='profile-member-non-vip animate__animated animate__backInUp animate__sp'></div>"
                );
                $("#member-area-4").append(newDiv);
              } else {
                $("#member-area-4")
                  .children()
                  .last()
                  .append(
                    "<div style='background-image: url("+ arg.message.profilePictureUrl +")' class='profile-member-non-vip animate__animated animate__backInUp animate__sp'></div>"
                  );
              }
            }
          }
        }
      });

      socket.on("gift", (arg) => {
        if (arg.room === `room_${titktokUsername}`) {
          console.log("dapet gift gaes => ", arg)
        }
      })

      socket.on("disconnect", () => {
        console.log("Terputus dari server");
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

$("#connect-socket").on("click", () => {
  const username = $("#input-username").val();

  if (username.length !== 0) {
    connectSocket(username);
  } else {
    Swal.fire({
      title: "Failed!",
      text: "Masukan Username!",
      icon: "error", // Jenis ikon (success, error, warning, info, question)
      confirmButtonText: "OK", // Teks pada tombol OK
    });
  }
});

$(".container-mobile").append(`<div style='background-image: url("https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/7244832db46b7ea5d7d6e280719ddea2~tplv-obj.png")' class='gift animate__animated animate__bounceIn animate__sp' ></div>`)