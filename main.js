"use strict";
import AgoraRTC from "agora-rtc-sdk-ng";

let rtc = {
  //For the Local audio and video tracks
  localAudioTrack: null,
  localVideoTrack: null,
  client: null,
};
console.log(import.meta.env.VITE_TEMPORARY_TOKEN);
let options = {
  appId: "390a98bf91af4b0cb1b5a3ae0a255bb4",
  channel: "dhave_test",
  token: import.meta.env.VITE_TEMPORARY_TOKEN,
  uid: Math.floor(Math.random() * 1000),
};

//Here we create an AgoraRTCClient object, call createClient and set mode to rtc or live according to your scenario.]
rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// Here the code block shows how we manipulate the dom (Join button) to Users Join a channel and publish
document.getElementById("join").onclick = async function () {
  //Join an rtc channel
  await rtc.client.join(
    options.appId,
    options.channel,
    options.token,
    options.uid
  );

  // Here  we Create a local audio track from the audio sampled by a microphone.
  rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

  // Here we a local video track from the video captured by a camera.
  rtc.localVideoTrack = await AgoraRTC.createMicrophoneVideoTrack();

  //Here we Publish the Local audio and video tracks to the RTC channel.
  await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

  //We then Dynamically create a container in the form of a DIV element for playing the local video track.
  const localPlayerContainer = document.createElement("div");

  //We Specify the ID of the DIV container. You can use the uid of the local user.
  // Here we create Various video boxes per say for each user that joins and each user has lit unique id - uid
  localPlayerContainer.id = options.uid;
  localPlayerContainer.textContent = "Local user" + options.uid;
  localPlayerContainer.style.width = "640px";
  localPlayerContainer.style.height = "480px";
  document.body.append(localPlayerContainer);
};

// Subscribe to and play remote tracks

// Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
rtc.client.on("user-published", async (user, mediaType) => {
  // Subscribe to the remote user when the SDK triggers the "user-published" event
  await rtc.client.subscribe(user, mediaType);
  console.log("subscribe success");

  // If the remote user publishes a video track.
  if (mediaType === "video") {
    // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
  }
});
