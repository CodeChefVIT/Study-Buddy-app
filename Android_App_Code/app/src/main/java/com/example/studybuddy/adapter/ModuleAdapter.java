package com.example.studybuddy.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.studybuddy.R;
import com.example.studybuddy.model.Module;

import java.text.MessageFormat;
import java.util.List;

public class ModuleAdapter extends RecyclerView.Adapter<ModuleAdapter.myViewHolder> {

    List<Module> moduleList;

    public ModuleAdapter(List<Module> moduleList) {
        this.moduleList = moduleList;
    }

    @NonNull
    @Override
    public myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.layout_module, parent, false);
        return new myViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull myViewHolder holder, int position) {
        Module module = moduleList.get(position);
        holder.moduleName.setText(module.getName());
        holder.number.setText(MessageFormat.format("{0}. ", position + 1));
        if (position == getItemCount() - 1){
            holder.divider.setVisibility(View.GONE);
        }
    }

    @Override
    public int getItemCount() {
        return (moduleList == null) ? 0 : moduleList.size();
    }

    public class myViewHolder extends RecyclerView.ViewHolder {
        TextView moduleName, number;
        View divider;
        public myViewHolder(@NonNull View itemView) {
            super(itemView);

            moduleName = itemView.findViewById(R.id.moduleName);
            divider = itemView.findViewById(R.id.view);
            number = itemView.findViewById(R.id.number);
        }
    }
}
