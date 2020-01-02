<!--
 * @Description: 页面顶部
 * @Author: PengYH
 * @Date: 2019-12-16
 -->
<template>
  <div class="navbar">
    <el-menu class="navbar__left" mode="horizontal">
      <el-menu-item class="site-navbar__switch" index="0" @click="onCollapse">
        <i v-if="collapse" class="el-caidan-zhankai" title="侧边展开"></i>
        <i v-else class="el-caidan-shousuo" title="侧边收缩"></i>
      </el-menu-item>
    </el-menu>
    <el-menu class="navbar__right" mode="horizontal" @select="navbarSelect">
      <el-menu-item index="unreadMessage">
        <i class="el-xiaoxi">
          <i class="el-newmsg newmsg"></i>
        </i>
      </el-menu-item>
      <el-menu-item index="note">
        <a>
          <el-popover
            placement="bottom"
            title="便签"
            width="300"
            trigger="click"
            content="便签中的内容会存储在本地，这样即便你关掉了浏览器，在下次打开时，依然会读取到上一次的记录。是个非常小巧实用的本地备忘录"
          >
            <i class="el-biaoqian" slot="reference"></i>
          </el-popover>
        </a>
      </el-menu-item>
      <el-menu-item>
        <picker-theme />
      </el-menu-item>
      <el-menu-item index="screen" title="全屏" command="screen">
        <i class="el-icon-full-screen"></i>
      </el-menu-item>
      <el-menu-item>
        <el-dropdown @command="downClick">
          <span class="el-dropdown-link">
            <img :src="avatar" class="avatar" @error="onError" />
            超级管理员
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="down-list">
            <el-dropdown-item class="down__item" command="userInfo">个人信息</el-dropdown-item>
            <el-dropdown-item class="down__item" command="updatePassword">修改密码</el-dropdown-item>
            <el-dropdown-item class="down__item" command="loginOut">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
      <el-menu-item class="navbar__right__other">
        <i class="el-youcecaidan"></i>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import pickerTheme from "./main-picker-theme";
export default {
  components: {
    pickerTheme
  },
  data() {
    return {
      /**是否折叠 */
      collapse: false,
      /**头像地址 */
      avatar: require("./../../assets/images/avatar.gif"),
      /**是否全屏 */
      isScreen: ""
    };
  },
  methods: {
    /*******************************************************************************************************************************************************/
    /* 功能：内部通用方法*/
    /*******************************************************************************************************************************************************/

    /**未读消息 */
    unreadMessage() {},

    /**便签 */
    note() {},

    /**全屏/退出全屏 */
    screen() {
      if (!this.isScreen) {
        //全屏
        var el = document.documentElement;
        var rfs =
          el.requestFullScreen ||
          el.webkitRequestFullScreen ||
          el.mozRequestFullScreen ||
          el.msRequestFullScreen;
        if (typeof rfs != "undefined" && rfs) {
          rfs.call(el);
        } else if ("ActiveXObject" in window) {
          var WsShell = new ActiveXObject("WScript.Shell");
          WsShell.SendKeys("{F11}");
        }
      } else {
        var exitMethod =
          document.exitFullscreen || //W3C
          document.mozCancelFullScreen || //FireFox
          document.webkitExitFullscreen || //Chrome等
          document.webkitExitFullscreen; //IE11
        if (exitMethod) {
          exitMethod.call(document);
        } else if ("ActiveXObject" in window) {
          var WsShell = new ActiveXObject("WScript.Shell");
          WsShell.SendKeys("{F11}");
        }
      }
      this.isScreen = !this.isScreen;
    },

    /**个人信息 */
    userInfo() {
      this.$message.success("个人信息");
    },

    /**修改密码 */
    updatePassword() {
      this.$message.success("修改密码");
    },

    /**退出 */
    loginOut() {
      this.$router.push("/login");
    },
    /*******************************************************************************************************************************************************/
    /* 功能：监听事件代码段*/
    /*******************************************************************************************************************************************************/

    /**又侧选项单击 */
    navbarSelect(index) {
      if (index) this[index]();
    },

    /**收缩展开 */
    onCollapse() {
      this.collapse = !this.collapse;
      this.$emit("collapse", this.collapse);
    },

    /**图片错误事件 */
    onError(e) {
      var ImgObj = new Image();
      ImgObj.src = e.target.src;
      if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0))
        return true;
      else e.currentTarget.src = require("./../../assets/images/avatar.gif");
    },

    /**下拉单击 */
    downClick(command) {
      this[command]();
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  padding-right: 15px;
  &__left {
    width: 200px;
    float: left;
    .iconfont {
      color: #303133;
    }
  }
  &__right {
    float: right;
    &__other {
      padding: 0;
    }
  }

  /deep/ .el-menu,
  /deep/ .el-menu-item.is-active {
    border-bottom: none;
  }
}

.avatar {
  border-radius: 10px;
  height: 40px;
  width: 40px;
}

.down-list {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100px;
  padding: 4px 0;
  &__item {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    color: #909399;
    letter-spacing: 2px;
    font-size: 13px;
    letter-spacing: 3px;
    .text {
      padding: 0 10px;
    }
  }
}

.el-xiaoxi {
  position: relative;
  .el-newmsg {
    position: absolute;
    color: red;
    top: -28px;
    left: 5px;
    font-size: 20px;
  }
}
</style>