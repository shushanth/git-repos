import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import InputText from "../../ui/InputText.vue";

describe("InputText", () => {
  it("renders properly", () => {
    const wrapper = mount(InputText, {
      props: {
        placeholder: "search",
      },
    });
    expect(wrapper.find(".input").exists()).toBe(true);
    expect(wrapper.find(".input").attributes("placeholder")).toBe("search");
  });

  it("it should emit events on input change", async () => {
    const wrapper = mount(InputText, {
      props: {
        placeholder: "search",
      },
    });
    const inputValueChanged = "input value changed";
    await wrapper.find(".input").setValue(inputValueChanged);
    const inputChangeEvent = wrapper.emitted("onInputChange");
    expect(wrapper.emitted()).toHaveProperty("onInputChange");
    expect(inputChangeEvent).toHaveLength(1);
    expect(inputChangeEvent?.[0][0]).toBe(inputValueChanged);
  });
});
