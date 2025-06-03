<template>
  <view
    :class="[
      'fanc-collapse-item',
      { 'fanc-collapse-item--expanded': isExpanded },
      { 'fanc-collapse-item--disabled': disabled },
      { 'fanc-collapse-item--border': index !== 0 && parent.border }
    ]"
  >
    <view
      class="fanc-collapse-item__header"
      :style="{ paddingLeft: `${leftIcon ? '16px' : '12px'}` }"
      @click="onClick"
    >
      <view v-if="leftIcon" class="fanc-collapse-item__left-icon">
        <fanc-icon :name="leftIcon" :size="leftIconSize" :color="leftIconColor"></fanc-icon>
      </view>
      <view class="fanc-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </view>
      <view class="fanc-collapse-item__value">
        <slot name="value">{{ value }}</slot>
      </view>
      <view class="fanc-collapse-item__right-icon" :class="{ 'is-expanded': isExpanded }">
        <fanc-icon name="chevron-down" size="14" color="#969799"></fanc-icon>
      </view>
    </view>
    <view
      class="fanc-collapse-item__wrapper"
      :style="{ height: animationHeight }"
    >
      <view class="fanc-collapse-item__content" ref="content">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'fanc-collapse-item',
  props: {
    // 唯一标识符，默认为索引值
    name: {
      type: [String, Number],
      default: null
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 右侧内容
    value: {
      type: String,
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 左侧图标
    leftIcon: {
      type: String,
      default: ''
    },
    // 左侧图标大小
    leftIconSize: {
      type: [String, Number],
      default: 16
    },
    // 左侧图标颜色
    leftIconColor: {
      type: String,
      default: '#323233'
    }
  },
  inject: {
    collapse: {
      default: null
    }
  },
  data() {
    return {
      index: 0,
      inited: false,
      animationHeight: '0px'
    };
  },
  computed: {
    // 获取父组件
    parent() {
      return this.collapse;
    },
    // 当前面板名称
    currentName() {
      return this.name ?? this.index;
    },
    // 是否展开
    isExpanded() {
      if (!this.parent) return false;
      return this.parent.activeNames.includes(this.currentName);
    }
  },
  watch: {
    isExpanded(val) {
      if (val) {
        this.inited = true;
        this.$nextTick(() => {
          this.updateContentHeight();
        });
      } else {
        this.animationHeight = '0px';
      }
    }
  },
  mounted() {
    this.parent && this.parent.addChild(this);
    // 获取在父组件中的索引
    if (this.parent && this.parent.children) {
      this.index = this.parent.children.indexOf(this);
    }
    
    // 如果默认展开，初始化内容高度
    if (this.isExpanded) {
      this.inited = true;
      this.$nextTick(() => {
        this.updateContentHeight();
      });
    }
  },
  beforeDestroy() {
    this.parent && this.parent.removeChild(this);
  },
  methods: {
    // 点击标题切换展开状态
    onClick() {
      if (this.disabled) {
        return;
      }
      
      const { parent, currentName } = this;
      const expanded = !this.isExpanded;
      
      if (parent) {
        parent.toggle(currentName, expanded);
      }
    },
    // 更新内容区域高度
    updateContentHeight() {
      if (!this.$refs.content) return;
      
      const contentHeight = this.$refs.content.offsetHeight;
      this.animationHeight = `${contentHeight}px`;
    }
  }
};
</script>

<style>
.fanc-collapse-item {
  position: relative;
  width: 100%;
}

.fanc-collapse-item--border {
  border-top: 1px solid var(--border-color);
}

.fanc-collapse-item__header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 16px 12px 12px;
  font-size: 14px;
  line-height: 24px;
  color: var(--text-primary);
  background-color: var(--bg-white);
  cursor: pointer;
}

.fanc-collapse-item--disabled .fanc-collapse-item__header {
  color: var(--text-disabled);
  cursor: not-allowed;
}

.fanc-collapse-item__left-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.fanc-collapse-item__title {
  flex: 1;
  font-weight: 500;
}

.fanc-collapse-item__value {
  margin-right: 8px;
  color: var(--text-secondary);
  font-size: 12px;
}

.fanc-collapse-item__right-icon {
  transition: transform 0.3s;
}

.fanc-collapse-item__right-icon.is-expanded {
  transform: rotate(180deg);
}

.fanc-collapse-item__wrapper {
  overflow: hidden;
  transition: height 0.3s ease;
  will-change: height;
}

.fanc-collapse-item__content {
  padding: 12px 16px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
  background-color: var(--bg-white);
}

.fanc-collapse-item--expanded .fanc-collapse-item__content {
  border-bottom: 1px solid var(--border-color);
}
</style> 