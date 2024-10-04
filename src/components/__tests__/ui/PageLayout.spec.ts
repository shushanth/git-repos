import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import PageLayout from "../../ui/PageLayout.vue";

describe("PageLayout", () => {
  it("renders properly", () => {
    const wrapper = mount(PageLayout, {
      props: {
        title: "Title",
      },
      slots: {
        default: "slot content",
      },
    });
    expect(wrapper.find(".page_layout").exists()).toBe(true);
    expect(wrapper.find(".content").exists()).toBe(true);
    expect(wrapper.find(".content").html()).toContain("slot content");
  });
});
