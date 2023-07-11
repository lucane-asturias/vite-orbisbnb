<template>
  <progress class="progress mb-4" max="100">60%</progress>
</template>

<style lang="css" scoped>
 
/* CSS to animate a progress bar indeterminately */
/* https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate */

progress, progress[value]::-webkit-progress-bar {
  -webkit-appearance: none;
  appearance: none;
  
  height: 0.75rem;
  background-color: #eee;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
}

progress, progress[value]::-webkit-progress-bar {
  -webkit-appearance: none;
  appearance: none;

  background-color: #eee;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
}

progress, progress[value]::-webkit-progress-value {
  border-radius: 5px;
  background-image: linear-gradient(to right, #3e8ed0 30%, #ededed 30%) !important
}

.progress {
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  border-radius: 9999px;
  display: block;
  height: 0.75rem;
  overflow: hidden;
  padding: 0;
  width: 100%;
}

.progress::-ms-fill {
  background-color: #4a4a4a;
  border: none;
}

.progress:indeterminate {
  -webkit-animation-duration: 1.5s;
          animation-duration: 1.5s;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-animation-name: moveIndeterminate;
          animation-name: moveIndeterminate;
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
  background-color: #ededed;
  background-image: linear-gradient(to right, #4a4a4a 30%, #ededed 30%);
  background-position: top left;
  background-repeat: no-repeat;
  background-size: 150% 150%;
}

.progress:indeterminate::-webkit-progress-bar {
  background-color: transparent;
}

.progress:indeterminate::-moz-progress-bar {
  background-color: transparent;
}

@-webkit-keyframes moveIndeterminate {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

@keyframes moveIndeterminate {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}
</style>