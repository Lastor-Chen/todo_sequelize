// 前端 lib inputSwitch.js

// =============================

/**
 * 啟用/關閉 input 輸入
 */
function inputSwitch(id, boolean) {
  // input[name="name"]
  $(`input[data-id="${id}"]`).prop('disabled', !boolean)
  $(`input[data-id="${id}"]`).toggleClass('unselectable')

  // checkbox
  $(`input#${id}`).toggleClass('unselectable')

  // small info
  $(`small[data-id="${id}"]`).prop('hidden', !boolean)
}


// export
// ==============================

export { inputSwitch }