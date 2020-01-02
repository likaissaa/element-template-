<template>
  <div class="login">
    <div class="login__form">
      <h1 class="login__form__title">后台管理系统</h1>
      <el-form ref="formLogin" :model="formLogin" v-loading="loading" size="small">
        <el-form-item label prop="account">
          <el-input
            type="text"
            v-model="formLogin.account"
            placeholder="用户名"
            @keydown.enter.native="Login('formLogin')"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input
            type="password"
            v-model="formLogin.password"
            placeholder="密码"
            @keydown.enter.native="Login('formLogin')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" id="loginbtn" @click="Login('formLogin')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formLogin: {
        account: "admin",
        password: "admin"
      },
      loading: false
    };
  },
  /*******************************************************************************************************************************************************/
  /* 功能：内部通用方法*/
  /*******************************************************************************************************************************************************/
  methods: {
    Login(formName) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$router.push("/index");
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url("./../../assets/images/loginbg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  &__form {
    width: 450px;
    height: 300px;
    background: #ffffff;
    align-self: center;
    margin: 0 auto;
    opacity: 0.85;
    &__title {
      margin: 1.2em 0;
      font-weight: bold;
      letter-spacing: 5px;
      text-align: center;
      font-size: 1.5em;
      color: #409eff;
    }
  }
}

.el-form-item {
  width: 80%;
  margin: 22px auto;
  text-align: center;
}
.el-button {
  width: 100%;
}
</style>
