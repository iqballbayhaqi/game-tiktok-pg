function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

animateValue(
  document.getElementById("score1"),
  0,
  Number($("#score1").text()),
  5000
);
animateValue(
  document.getElementById("score2"),
  0,
  Number($("#score2").text()),
  5000
);
animateValue(
  document.getElementById("score3"),
  0,
  Number($("#score3").text()),
  5000
);
animateValue(
  document.getElementById("score4"),
  0,
  Number($("#score4").text()),
  5000
);

$(function () {
  $(document).on("change", ".uploadFile", function () {
    var uploadFile = $(this);
    var files = !!this.files ? this.files : [];
    if (!files.length || !window.FileReader) return;

    if (/^image/.test(files[0].type)) {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onloadend = function () {
        uploadFile
          .closest(".imgUp")
          .find(".imagePreview")
          .css("background-image", "url(" + this.result + ")");

        switch (Number(uploadFile.closest(".imgUp").attr("slot"))) {
          case 1:
            $("#img-thumbnail-1").attr("src", this.result);
            break;
          case 2:
            $("#img-thumbnail-2").attr("src", this.result);
            break;
          case 3:
            $("#img-thumbnail-3").attr("src", this.result);
            break;
          case 4:
            $("#img-thumbnail-4").attr("src", this.result);
            break;
          default:
            break;
        }
      };
    }
  });
});

$("#f11button").on("click", (event) => {
  if ($(event.target).attr("isFullScreen") === "true") {
    $(event.target).attr("isFullScreen", "false");
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  } else {
    $(event.target).attr("isFullScreen", "true");
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
});

$("#hideGambarSection").on("click", (event) => {
  if ($(event.target).attr("isOpen") === "true") {
    $(event.target).attr("isOpen", "false");
    $("#slotGambarBody").show();
  } else {
    $(event.target).attr("isOpen", "true");
    $("#slotGambarBody").hide();
  }
});

$("#hideScoreSection").on("click", (event) => {
  if ($(event.target).attr("isOpen") === "true") {
    $(event.target).attr("isOpen", "false");
    $("#slotScoreBody").show();
  } else {
    $(event.target).attr("isOpen", "true");
    $("#slotScoreBody").hide();
  }
});

$("#hidePertanyaanSection").on("click", (event) => {
  if ($(event.target).attr("isOpen") === "true") {
    $(event.target).attr("isOpen", "false");
    $("#slotPertanyaanBody").show();
  } else {
    $(event.target).attr("isOpen", "true");
    $("#slotPertanyaanBody").hide();
  }
});

$("#hideSuaraSection").on("click", (event) => {
  if ($(event.target).attr("isOpen") === "true") {
    $(event.target).attr("isOpen", "false");
    $("#slotSuaraBody").show();
  } else {
    $(event.target).attr("isOpen", "true");
    $("#slotSuaraBody").hide();
  }
});

$("#download-question").on("click", () => {
  var fileURL = "./contoh_pertanyaan.txt";

  var link = document.createElement("a");
  link.href = fileURL;
  link.target = "_blank";
  link.download = "contoh_pertanyaan.txt";

  link.click();
});

$("#setKey1").on("input", function () {
  const newValue = $(this).val();
  sessionStorage.setItem("key1", newValue);
  $("#key1").text(newValue);
});

$("#setKey2").on("input", function () {
  const newValue = $(this).val();
  sessionStorage.setItem("key2", newValue);
  $("#key2").text(newValue);
});

$("#setKey3").on("input", function () {
  const newValue = $(this).val();
  sessionStorage.setItem("key3", newValue);
  $("#key3").text(newValue);
});

$("#setKey4").on("input", function () {
  const newValue = $(this).val();
  sessionStorage.setItem("key4", newValue);
  $("#key4").text(newValue);
});

$("#inputPertanyaan").on("change", (event) => {
  const fileInput = $(event.target)[0];

  if (fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContents = e.target.result;
      const lines = fileContents.split("\n");
      let valid = true;

      for (const line of lines) {
        const parts = line.split("|");
        if (parts.length !== 6) {
          valid = false;
          break;
        }
      }

      if (valid) {
        // alert("Format file .txt sesuai.");
        Swal.fire({
          title: "Success!",
          text: "Pertanyaan berhasil diupload.",
          icon: "success", // Jenis ikon (success, error, warning, info, question)
          confirmButtonText: "OK", // Teks pada tombol OK
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Pertanyaan gagal diupload, File/Penulisan tidak sesuai",
          icon: "error", // Jenis ikon (success, error, warning, info, question)
          confirmButtonText: "OK", // Teks pada tombol OK
        });
        // alert("Format file .txt tidak sesuai. Pastikan formatnya benar.");
      }

      const questions = [];

      lines.forEach((line) => {
        const question = line.split("|")[0];
        const optionsA = line.split("|")[1];
        const optionsB = line.split("|")[2];
        const optionsC = line.split("|")[3];
        const optionsD = line.split("|")[4];
        const correctAnswer = line.split("|")[5];

        const questionObject = {
          question: question.trim(),
          options: [optionsA, optionsB, optionsC, optionsD],
          correctAnswer: correctAnswer.trim(),
        };

        questions.push(questionObject);
      });

      sessionStorage.setItem("question", JSON.stringify(questions));
      sessionStorage.setItem("currentQuestion", 0);
    };

    reader.readAsText(selectedFile);
  } else {
    alert("Pilih file terlebih dahulu.");
  }
});

$("#mulai").on("click", () => {
  const data = JSON.parse(sessionStorage.getItem("question"))[
    Number(sessionStorage.getItem("currentQuestion"))
  ];
  Swal.fire({
    showConfirmButton: false,
    html: "<p>" + data.question + "</p>" + 
    '<div class="mb-2 p-2 text-start bg-primary rounded text-white" >' + data.options[0]  + '</div>' +
    '<div class="mb-2 p-2 text-start bg-primary rounded text-white" >' + data.options[1]  + '</div>' +
    '<div class="mb-2 p-2 text-start bg-primary rounded text-white" >' + data.options[2]  + '</div>' +
    '<div class="mb-2 p-2 text-start bg-primary rounded text-white" >' + data.options[3]  + '</div>' 
  });
});
