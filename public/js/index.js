// 前端 index.js

import { inputSwitch } from './lib/inputSwitch.js'

// =============================

let todoCache = ''

$('#data-plane').on('click', e => {
  if (e.target.matches('.del-btn')) {
    const id = e.target.dataset.id

    // 將 id 注入 form.action
    let formAction = $('#del-form').attr('action')
    formAction = formAction.replace('{id}', id)

    $('#del-form').attr('action', formAction)
  }

  if (e.target.matches('.edit-btn')) {
    const id = e.target.dataset.id
    // save name of todo
    todoCache = $(`input[data-id="${id}"]`).val()

    inputSwitch(id, true)
    $(`input[data-id="${id}"]`).focus()
  }
})

// input edit 取消時
$('#data-plane').on('focusout', e => {
  if (e.target.matches(`input[name="name"]`)) {
    const id = e.target.dataset.id

    inputSwitch(id, false)
    e.target.value = todoCache
  }
})

// 監聽 todos checkbox
$('#data-plane').change(e => {
  $(e.target).parent().submit()
})