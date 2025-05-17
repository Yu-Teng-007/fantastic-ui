<template>
  <view 
    class="fanc-checkbox-group" 
    :class="{ 'fanc-checkbox-group--disabled': disabled }"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "fanc-checkbox-group",
  
  provide() {
    return {
      fancCheckboxGroup: this
    };
  },
  
  props: {
    // 当前选中的值
    value: {
      type: Array,
      default: () => []
    },
    // 是否禁用所有复选框
    disabled: {
      type: Boolean,
      default: false
    },
    // 选中状态颜色
    checkedColor: {
      type: String,
      default: ""
    },
    // 最大可选数量
    max: {
      type: Number,
      default: 0 // 0表示不限制
    },
    // 形状，支持square、round
    shape: {
      type: String,
      default: "round"
    },
    // 排列方向，horizontal水平，vertical垂直
    direction: {
      type: String,
      default: "horizontal",
      validator: (val) => ["horizontal", "vertical"].includes(val)
    }
  },
  
  computed: {
    // 是否已达到最大选择数量
    isExceedMax() {
      return this.max > 0 && this.value.length >= this.max;
    }
  },
  
  watch: {
    direction: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          const el = this.$el;
          if (!el) return;
          
          if (val === "vertical") {
            el.classList.add("fanc-checkbox-group--vertical");
          } else {
            el.classList.remove("fanc-checkbox-group--vertical");
          }
        });
      }
    }
  },
  
  methods: {
    /**
     * 切换选中状态
     * @param {String|Number|Boolean} name 复选框的name
     */
    toggleValue(name) {
      // 当前选中值的副本
      const currentValue = [...this.value];
      const index = currentValue.indexOf(name);
      
      // 如果已选中，则取消选中
      if (index !== -1) {
        currentValue.splice(index, 1);
        this.$emit("input", currentValue);
        this.$emit("change", currentValue);
        return;
      }
      
      // 如果未选中但达到最大数量限制，则不操作
      if (this.isExceedMax) {
        this.$emit("exceed-max", this.max);
        return;
      }
      
      // 添加到选中项
      currentValue.push(name);
      this.$emit("input", currentValue);
      this.$emit("change", currentValue);
    },
    
    /**
     * 全选
     */
    selectAll() {
      // 获取所有子checkbox的name值
      const allCheckboxNames = this.getAllCheckboxNames();
      // 最大数量限制检查
      const selectedNames = this.max > 0 ? allCheckboxNames.slice(0, this.max) : allCheckboxNames;
      
      this.$emit("input", selectedNames);
      this.$emit("change", selectedNames);
      
      if (this.max > 0 && allCheckboxNames.length > this.max) {
        this.$emit("exceed-max", this.max);
      }
    },
    
    /**
     * 取消全选
     */
    unselectAll() {
      this.$emit("input", []);
      this.$emit("change", []);
    },
    
    /**
     * 获取所有子checkbox的name值
     */
    getAllCheckboxNames() {
      // 获取所有子checkboxes
      const checkboxes = this.getCheckboxes();
      // 提取所有checkbox的name值
      return checkboxes
        .filter(checkbox => !checkbox.disabled)
        .map(checkbox => checkbox.name);
    },
    
    /**
     * 获取所有子checkbox组件实例
     */
    getCheckboxes() {
      const result = [];
      const traverse = (children) => {
        if (!children) return;
        
        children.forEach(child => {
          if (child.$options.name === "fanc-checkbox") {
            result.push(child);
          } else if (child.$children) {
            traverse(child.$children);
          }
        });
      };
      
      traverse(this.$children);
      return result;
    }
  }
};
</script>

<style>
.fanc-checkbox-group {
  display: flex;
  flex-wrap: wrap;
}

.fanc-checkbox-group--vertical {
  flex-direction: column;
}

.fanc-checkbox-group--vertical .fanc-checkbox {
  margin-right: 0;
  margin-bottom: 8px;
}

.fanc-checkbox-group--disabled {
  opacity: var(--checkbox-disabled-opacity, 0.6);
  cursor: not-allowed;
}

.fanc-checkbox-group .fanc-checkbox {
  margin: var(--checkbox-group-margin, 0 8px 8px 0);
}
</style> 