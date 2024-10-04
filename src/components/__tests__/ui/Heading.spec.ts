import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Heading from "../../ui/Heading.vue";

describe("Heading", () => {
  it("renders properly", () => {
    const wrapper = mount(Heading, {
      props: {
        level: "h1",
        title: "heading h1",
      },
    });
    expect(wrapper.find(".heading").exists()).toBe(true);
    expect(wrapper.find(".heading").find("h1").exists()).toBe(true);
    expect(wrapper.find(".heading").find("h1").text()).toContain("heading h1");
  });

  it("renders properly with passed props", () => {
    const wrapper = mount(Heading, {
      props: {
        level: "h2",
        title: "heading h2",
      },
    });
    expect(wrapper.find(".heading").exists()).toBe(true);
    expect(wrapper.find(".heading").find("h2").exists()).toBe(true);
    expect(wrapper.find(".heading").find("h2").text()).toContain("heading h2");
  });

  it("renders properly with passed props", () => {
    const wrapper = mount(Heading, {
      props: {
        level: "h3",
        title: "heading h3",
      },
    });
    expect(wrapper.find(".heading").exists()).toBe(true);
    expect(wrapper.find(".heading").find("h3").exists()).toBe(true);
    expect(wrapper.find(".heading").find("h3").text()).toContain("heading h3");
  });
});
