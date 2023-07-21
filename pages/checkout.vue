<script setup>
// import { useMailer } from "#mailer"

// const mailer = useMailer()
const emailData = ref({
  to: '',
  subject: '',
  message: ''
})

const sendMail = () => {
  messageFromForm: {
    to: to.value
    subject: subject.value
    message: message.value
  }

  console.log('MESSAGE FROM FORM', messageFromForm);
}
</script>

<template>
  <div class="bg-slate-100">
    <div class="max-w-5xl mx-auto pt-40 min-h-screen">
      <h1 class="text-5xl">Checkout PAge</h1>
      <form @submit.prevent="sendEmail" class="flex flex-col">
        <label for="to">To:</label>
        <input type="email" id="to" v-model="emailData.to" required class="py-2 px-4 border rounded-md">

        <label for="subject">Subject:</label>
        <input type="text" id="subject" v-model="emailData.subject" required class="py-2 px-4 border rounded-md">

        <label for="message">Message:</label>
        <textarea id="message" v-model="emailData.message" required class="py-2 px-4 border rounded-md"></textarea>

        <button type="submit" class="bg-green-500 text-white py-3 px-7">Send Email</button>
      </form>
    </div>
  </div>
</template>


<style scoped></style>