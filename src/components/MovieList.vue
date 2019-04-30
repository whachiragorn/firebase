<template>
<div class="hello">
    <h4>{{ msg }}</h4>
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3"/>
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <div class="panel panel-success" >
      <div class="panel-heading">
        <h3 class="panel-title">Add New Movie</h3>
      </div>
      <div class="panel-body">
        <input type="text" v-model='movie' class="form-control" @keyup.enter='addMovie'>
      </div>
      </div>
    <div class="panel panel-info" >
      <div class="panel-heading">
        <h3 class="panel-title">List of Movies (Update/Delete)</h3>
      </div>
      <div class="panel-body">
        <ul>
          <li v-for="(movieName,key) in movies" :key='key'>
              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <p><b>{{movieName.name}}</b></p>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <input type="text" v-model="editName[key]" class="form-control" @keyup.enter="editMovie(key)">
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <button class="btn btn-xs btn-warning" @click="editMovie(key)">Update</button>
                  <button class="btn btn-xs btn-danger" @click="deleteMovie(key)">Delete</button>
                  <button class="btn btn-xs btn-danger" @click="logout()">Logout</button>
                </div>
              </div>
              <br>
          </li>
        </ul>
      </div>
    </div>
    </div>
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3"/>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  data () {
    return {
      msg: 'Vue.js CRUD FIrebase',
      movie: null,
      movies: {},
      editName: []
    }
  },
  methods: {
    addMovie(){
      firebase.database().ref('movies').push({name: this.movie})
      .then((data)=>{
        console.log(data)
      })
      .catch((error)=>{
        console.log(error);
      })
    },
    editMovie(key){
      firebase.database().ref('movies/'+key).set({
        name: this.editName[key]
      })
    },
    deleteMovie(key){
      firebase.database().ref('movies/'+key).remove()
      },
    logout(){
            firebase.auth().signOut()
            .then(user=>{
                this.$router.replace('/signin')
            })
            .catch(e =>{
                alert(e.message)
            })
      }
    },
    created() {
      firebase.database().ref('movies').on('value',(snapshot)=>{
        this.movies = snapshot.val()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
