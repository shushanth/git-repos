import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Label from "../../ui/Label.vue";

describe("Label", () => {
  it("renders properly", () => {
    const wrapper = mount(Label, {
      props: {
        level: "error",
      },
      slots: {
        default: "slot content",
      },
    });
    expect(wrapper.find(".label").exists()).toBe(true);
    expect(wrapper.find(".label").html()).toContain("slot content");
    expect(wrapper.find(".label--error").exists()).toBe(true);
  });
});
