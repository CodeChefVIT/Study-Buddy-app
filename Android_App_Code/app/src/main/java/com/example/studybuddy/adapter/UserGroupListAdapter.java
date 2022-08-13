package com.example.studybuddy.adapter;

import android.annotation.SuppressLint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.studybuddy.R;
import com.example.studybuddy.model.GroupInfo;

import java.text.CollationElementIterator;
import java.util.List;

public class UserGroupListAdapter extends RecyclerView.Adapter<UserGroupListAdapter.myViewHolder> {

    List<GroupInfo> groupInfoList;
    public UserGroupListAdapter(List<GroupInfo> groupInfoList) {
        this.groupInfoList = groupInfoList;
    }

    public void updateGroupInfoList(List<GroupInfo> groupInfoList) {
        this.groupInfoList = groupInfoList;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.layout_group, parent, false);
        return new myViewHolder(view);
    }

    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull myViewHolder holder, int position) {
        GroupInfo groupInfo = groupInfoList.get(position);
        holder.groupName.setText(groupInfo.getName());
        holder.groupSubject.setText(groupInfo.getSubject());
        holder.groupMembersLength.setText(groupInfo.getMembersLength() + "");
        holder.modules.setText(groupInfo.getModules().size() + "");
        // holder.index.setText((position + 1) + "");
    }

    @Override
    public int getItemCount() {
        return (groupInfoList == null) ? 0 : groupInfoList.size();
    }

    public static class myViewHolder extends RecyclerView.ViewHolder {
        TextView groupName, groupSubject, groupMembersLength, modules, index;

        public myViewHolder(@NonNull View itemView) {
            super(itemView);

            groupName = itemView.findViewById(R.id.group_name);
            groupSubject = itemView.findViewById(R.id.group_subject);
            groupMembersLength = itemView.findViewById(R.id.group_members_length);
            modules = itemView.findViewById(R.id.group_modules);
            // index = itemView.findViewById(R.id.group_index);
        }
    }
}
