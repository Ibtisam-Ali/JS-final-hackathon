import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    Timestamp,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import {auth, db } from "./config.js";
  
  const form = document.querySelector("#form");
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const ul = document.querySelector("#ul");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user);
      
    } else {
      window.location = 'login.html'
    }
  });

  const logout = document.querySelector('#logout-btn');

  logout.addEventListener('click', ()=>{
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'login.html'
      }).catch((error) => {
        console.log(error);
      });
      
  })

  
  
  const arr = [];
  
  async function getData() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    console.log(arr);
    renderTodo();
  }
  
  getData();
  
  function renderTodo() {
    ul.innerHTML = "";
    if (arr.length === 0) {
      ul.innerHTML = "no data found";
      return;
    }
    arr.map((item) => {
      ul.innerHTML += `
         <div class="card gap-3" style="width: 18rem;">
  <div class="card-body">
    <h3 class="card-title">Title: ${item.title}</h3>
    <p class="card-text">
    Description: ${item.description} </p>
          <button class="deleteBtn">Delete</button>
          <button class="editBtn">Edit</button>
  </div>
</div>`;
    });
  
    const deleteBtn = document.querySelectorAll(".deleteBtn");
    const editBtn = document.querySelectorAll(".editBtn");
  
    deleteBtn.forEach((btn, index) => {
      btn.addEventListener("click", async () => {
        console.log(arr[index]);
        await deleteDoc(doc(db, "users", arr[index].id));
        console.log("Data deleted");
        arr.splice(index, 1);
        renderTodo();
      });
    });
    // editBtn.forEach((btn, index) => {
    //   btn.addEventListener("click", async () => {
    //     const updatedNewTitle = prompt("enter new Title");
    //     const updatedNewDescription = prompt("enter new Description");
    //     const titleUpdate = doc(db, "users", arr[index].id);
    //     const descriptionUpdate = doc(db, "users", arr[index].id);
    //     await updateDoc(titleUpdate,descriptionUpdate, {
    //       title: updatedNewTitle,
    //       description: updatedNewDescription,
    //     });
    //     console.log("Data updated");
    //     arr[index].title = updatedNewTitle;
    //     arr[index].description = updatedNewDescription;
        
    //     renderTodo();
    //   });
    // });

  //   editBtn.forEach((btn, index) => {
  //       btn.addEventListener("click", async () => {
  //         const updatedNewTitle = prompt("Enter new Title");
  //         const updatedNewDescription = prompt("Enter new Description");
      
  //         const docRef = doc(db, "users", arr[index].id);
      
  //         await updateDoc(docRef, {
  //           title: updatedNewTitle,
  //           description: updatedNewDescription,
  //         });
      
  //         console.log("Data updated");
  //         arr[index].title = updatedNewTitle;
  //         arr[index].description = updatedNewDescription;
      
  //         renderTodo();
  //       });
  //     });
      
  // }


  editBtn.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
        try {
            const updatedNewTitle = prompt("Enter new Title");
            const updatedNewDescription = prompt("Enter new Description");

            const docRef = doc(db, "users", arr[index].id);

            await updateDoc(docRef, {
                title: updatedNewTitle,
                description: updatedNewDescription,
            });

            console.log("Data updated");
            arr[index].title = updatedNewTitle;
            arr[index].description = updatedNewDescription;

            renderTodo();
        } catch (error) {
            console.error("Error updating document: ", error);
            alert("There was an error updating the document. Please try again.");
        }
    });
});
  

  };

  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    try {
      const docRef = await addDoc(collection(db, "users"), {
        title: title.value,
        description: description.value,
        
      });
      console.log("Document written with ID: ", docRef.id);
      arr.push({
        title: title.value,
        description: description.value,
      });
      renderTodo();
      title.value = "";
      description.value = "";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });
  

