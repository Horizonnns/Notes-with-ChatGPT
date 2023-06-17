<script setup>
import { onMounted, onUnmounted, reactive, watch } from 'vue';

const state = reactive({
  notes: [],
  newNote: '',
});

const addNote = () => {
  state.notes.push({ text: state.newNote, checked: false, id: Date.now() });
  state.newNote = '';
};

const clearNotes = () => {
  state.notes = [];
};

const removeNote = (id) => {
  state.notes = state.notes.filter((note) => note.id !== id);
};

watch(
  () => state.notes,
  () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notes', JSON.stringify(state.notes));
    }
  },
  { deep: true }
);

onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      state.notes = JSON.parse(savedNotes);
    }
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('notes', JSON.stringify(state.notes));
  }
});
</script>

<template>
  <section class="container max-w-4xl px-5">
    <h1
      class="text-3xl sm:text-5xl text-center mx-auto font-bold select-none text-blue-950 w-36 sm:w-52 my-8 bg-yellow-300"
    >
      NotePad
    </h1>

    <form @submit.prevent="addNote" class="space-y-6 sm:space-y-20">
      <!-- поле ввода заметок -->
      <div class="relative">
        <input
          type="text"
          v-model="state.newNote"
          class="bg-transparent border-b mx-auto block w-full p-3 text-lg sm:text-2xl border-black/70 outline-none"
        />

        <div class="absolute top-7 sm:top-4 right-0 space-x-px">
          <button
            type="submit"
            class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white"
          >
            <svg
              class="w-4 h-4 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>

          <button
            type="submit"
            @click.prevent="clearNotes"
            class="px-2 py-1 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white"
          >
            <svg
              class="w-4 h-4 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- поле добавленных заметок -->
      <ul class="container mx-auto space-y-2 sm:space-y-3">
        <h2
          class="text-2xl sm:text-3xl text-center font-bold text-blue-950 bg-green-300 w-32"
        >
          My notes
        </h2>

        <li
          v-for="note in state.notes"
          :key="note.id"
          class="flex items-center space-x-2 text-lg sm:text-xl"
        >
          <div class="w-2 h-0.5 rounded-full bg-black"></div>

          <input
            type="checkbox"
            v-model="note.checked"
            :id="`checkbox${note.id}`"
            class="hidden"
          />

          <label
            :class="{ 'line-through': note.checked }"
            :for="`checkbox${note.id}`"
          >
            {{ note.text }}
          </label>

          <!-- skeleton loader -->
          <!-- <div
            v-if="!note.text"
            class="w-96 h-3.5 bg-slate-200 rounded-lg animate-pulse"
          ></div> -->

          <!-- кнопки редактирование -->
          <div class="flex space-x-1">
            <label
              :for="`checkbox${note.id}`"
              class="cursor-pointer relative rounded-full opacity-40 hover:opacity-100 duration-200"
            >
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>

              <div
                :class="{ hidden: !note.checked }"
                class="absolute top-2.5 left-0 w-6 h-0.5 -rotate-45 bg-black/60"
              ></div>
            </label>

            <button
              @click="() => removeNote(note.id)"
              class="opacity-40 hover:opacity-100 duration-200"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                ></path>
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </form>
  </section>
</template>
